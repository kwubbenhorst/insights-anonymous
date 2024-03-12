const { User, Conversation, Category } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const findMatchingCounselor = require('../utils/matchingAlgorithm'); // import the matching algorithm for use in the createConversation mutation resolver
const mongoose = require('mongoose');
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('privateConversation conversationPartner expertiseCategory isAvailable personality');
    },
    user: async (parent, { userId }) => {
      return await User.findById(userId).populate('privateConversation conversationPartner conversationPartner expertiseCategory isAvailable personality');
    },
    conversations: async () => {
      return await Conversation.find().populate('expertiseCategory, responses.username, isClosed');
    },
    conversation: async (parent, { conversationId }) => {
      return await Conversation.findById(conversationId).populate('expertiseCategory, isClosed');
    },
    categories: async () => {
      return await Category.find();
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password, role, expertiseCategory, personality }) => {
      const user = await User.create({ username, email, password, role, expertiseCategory, personality });;
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createConversation: async (_, { title, conversationHeadText, expertiseCategory, preferredPersonality }, context) => {
      try{
        // Extract user information from the JWT token in the context
        const { token } = context;

        if (!token) {
          // Handle unauthorized access, throw an error or return accordingly
          throw new AuthenticationError('Unauthorized access');
        }

        //Verify and decode the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract user information from the decoded token
        const { userId, username } = decodedToken;

        // Check if it's a public or a private conversation
        let isPrivate = false;
        let conversationPartner = null;
      
        if (context.isAuthenticated && context.isPrivatePage) {
          // If the user is logged in and initiating a conversation from the private page
          isPrivate = true;

          
          // Validate expertiseCategory
          if (!mongoose.Types.ObjectId.isValid(expertiseCategory)) {
            throw new Error('Invalid expertiseCategory');
          }
    
          // Validate preferredPersonality input for private conversations
          const validPersonalities = ['O', '!O', 'C', '!C', 'E', '!E', 'A', '!A', 'N', '!N', null];
      
          // Ensure that preferredPersonality is an array and has exactly 5 elements
          if (!Array.isArray(preferredPersonality) || preferredPersonality.length !== 5) {
            throw new Error('preferredPersonality must be an array with exactly 5 values.');
          }
      
          // Validate each element in the preferredPersonality array
          preferredPersonality.forEach((value) => {
            if (!validPersonalities.includes(value)) {
          throw new Error(`Invalid personality value: ${value}`);
          }
        });

          // Call the matching algorithm function to find a matching counselor
          const counselorMatch = await findMatchingCounselor(preferredPersonality, expertiseCategory);
    
          // Update user fields for private conversations
          await User.updateOne({ _id: user._id }, { $set: { isAvailable: false, conversationPartner: counselorMatch.userId } });
          await User.updateOne({ _id: counselorMatch.userId }, { $set: { isAvailable: false, conversationPartner: user._id } });
    
          conversationPartner = counselorMatch.userId;
        }
    
        // Create the conversation
        const conversationInput = {
          title,
          conversationHeadText,
          expertiseCategory: expertiseCategory,
          isPrivate,
          conversationPartner: conversationPartner,
        };
    
        const conversation = await Conversation.create(conversationInput);

        // Update user with the new privateConversation
        if (isPrivate) {
          await User.updateOne({ _id: userId }, { $set: { privateConversation: conversation._id } });
        }
    
        return conversation;
      } catch (error) {
        // Handle token verification error
        throw new AuthenticationError('Invalid or expired token');
      }
    },
    createResponse: async (parent, { conversationId, responseText }, context) => {
      try {
        // Extract user information from the context
        const { userId, username } = context.user;
    
        // Check if the user is authenticated
        if (!userId || !username) {
          throw new AuthenticationError('User not authenticated');
        }
      
        const updatedConversation = await Conversation.findByIdAndUpdate(
        conversationId,
        {
          $push: {
            responses: {
              responseText,
              username,
              createdAt: new Date(),
            },
          },
        },
        { new: true }
      );
    
      // Extract the last added response from the updated conversation
      const newResponse = updatedConversation.responses.slice(-1)[0];
    
      return newResponse;
  } catch (error) {
    // Handle authentication error or any other potential issues
    throw new Error('Error creating response: ' + error.message);
  }
}
}
};

module.exports = resolvers;

  
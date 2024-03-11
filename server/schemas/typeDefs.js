const { gql } = require('graphql-tag');

//exclamation marks mean the field can't be null, most fields are so marked except expertise category because only those users in role of counselor will have a value there.
const typeDefs = gql`
  type User {
    userId: ID!
    username: String!
    email: String!
    password: String!
    role: [String!]!
    expertiseCategory: [String] 
    personality: [String!]!
    isAvailable: Boolean!
    privateConversation: ID
    conversationPartner: ID
  }

  type Conversation {
    conversationId: ID!
    conversationHeadText: String!
    createdAt: String!
    isClosed: Boolean!
    closedAt: String
    valueAtClose: Float
    isPrivate: Boolean!
    expertiseCategory: ID
    responses: [Response!]!
    responseCount: Int!
  }

  type Response {
    responseId: ID!
    responseText: String!
    username: String!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Category {
    id: ID!
    name: String!
  }

  type Query {
    users: [User!]!
    user(userId: ID!): User
    conversations: [Conversation!]!
    conversation(conversationId: ID!): Conversation
    categories: [Category!]!
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      role: [String!]!
      expertiseCategory: [String]
      personality: [String!]!
    ): Auth
    login(username: String!, password: String!): Auth
    createConversation(
      conversationHeadText: String! 
      expertiseCategory: ID!
      preferredPersonality: [String!]
    ): Conversation
    createResponse(
      conversationId: ID!, 
      responseText: String!, 
      username: String!
    ): Response 
  }
`;

module.exports = typeDefs;



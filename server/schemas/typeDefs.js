const { gql } = require('graphql-tag');

//exclamation marks mean the field can't be null, most fields are so marked except expertise category because only those users in role of counselor will have a value there.
const typeDefs = gql`
  input ConversationFilterInput {
  isPrivate: Boolean
  }

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
    _id: ID!
    title: String!
    conversationHeadText: String!
    createdAt: String!
    username: String!
    isClosed: Boolean!
    closedAt: String
    valueAtClose: Float
    isPrivate: Boolean!
    expertiseCategory: String!
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
    conversations(filter: ConversationFilterInput): [Conversation]
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



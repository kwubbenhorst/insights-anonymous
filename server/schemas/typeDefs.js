const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    placeholderMutation: String
  }
`;

module.exports = typeDefs;


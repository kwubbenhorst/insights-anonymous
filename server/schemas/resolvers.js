const resolvers = {
    Query: {
      hello: () => 'Hello, world!',
    },
    Mutation: {
      placeholderMutation: () => 'Placeholder mutation response',
    },
  };
  
  module.exports = resolvers;
  
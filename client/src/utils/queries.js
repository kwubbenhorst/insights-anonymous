import { gql } from '@apollo/client';

export const GET_ALL_CONVERSATIONS = gql`
  query GetAllConversations {
    conversations {
      _id
      title
      username
      createdAt
      expertiseCategory
      responseCount
    }
  }
`;

export const GET_ALL_PUBLIC_CONVERSATIONS = gql`
  query GetAllPublicConversations {
    conversations(filter: { isPrivate: false }) {
      _id
      title
      username
      createdAt
      expertiseCategory
      responseCount
    }
  }
`;

export const GET_ALL_PRIVATE_CONVERSATIONS = gql`
  query GetAllPrivateConversations {
    conversations(filter: { isPrivate: true }) {
      _id
      title
      username
      createdAt
      expertiseCategory
      responseCount
    }
  }
`;



export const GET_CONVERSATION_BY_ID = gql`
  query GetConversationById($conversationId: ID!) {
    conversation(id: $conversationId) {
      _id
      title
      conversationHeadText
      createdAt
      username
      responses {
        responseId
        responseText
        username
        createdAt
      }
    }
  }
`;


// Add other queries as needed
// export const GET_SINGLE_CONVERSATION = gql`...`;
// export const GET_USER_CONVERSATIONS = gql`...`;
// ... and so on

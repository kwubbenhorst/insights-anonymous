import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATION_BY_ID } from '../utils/queries';
import './Conversation.css';

const Conversation = ({ conversationId, onClose }) => {
  console.log("Value of conversationId that is being passed from the homepage parent component:", conversationId);

  const { loading, error, data, refetch } = useQuery(GET_CONVERSATION_BY_ID, {
      variables: { conversationId },
  });

  useEffect(() => {
      if (conversationId) {
          refetch();
      }
  }, [conversationId, refetch]);

    if  (loading) return <p>Loading...</p>;
    if  (error) return <p>Error...</p>;

    const { conversation: fetchedConversation } = data;

    return (
      <div className="conversation-container">
        <div className="conversation-title">{fetchedConversation.title}</div>
        <div className="conversation-head-text">{fetchedConversation.conversationHeadText}</div>
        <div className="response-container">
          <div className="response-list">
            {fetchedConversation.responses.map((response, index) => (
              <div key={index} className="response">{response}</div>
            ))}
          </div>
        </div>
        <div className="input-container">
          <textarea className="form-control" rows="3" placeholder="Type your message..."></textarea>
          <button type="button" className="btn btn-primary">Submit</button>
        </div>
      </div>
    );
};

export default Conversation;
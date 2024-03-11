// This file contains code for the ConversationsList component, used on the bottom of the Home page. In each of three columns there is a container for the headtext of a conversation. If this element is clicked upon it will open up the full conversation (another component)
import React from 'react';
import './ConversationsList.css';

const ConversationsList = () => {
    return (
      <div className='conversations-list-container' >
        <ul className="list-group list-group-numbered">
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">ConversationTitleOrFirst8Words</div>
                    ConversationHeadText
                </div>
                <span className="badge bg-primary rounded-pill">12</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">ConversationTitleOrFirst8Words</div>
                    ConversationHeadText
                </div>
                <span className="badge bg-primary rounded-pill">7</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">ConversationTitleOrFirst8Words</div>
                    ConversationHeadText
                </div>
                <span className="badge bg-primary rounded-pill">33</span>
            </li>
        </ul>
      </div>
    );
  };
  
  export default ConversationsList;
import React from 'react';
import { Link } from 'react-router-dom';
import './ConversationsList.css';

const ConversationsList = ({ conversations, expertiseCategory, onConversationClick }) => {
  console.log('Received expertiseCategory:', expertiseCategory);
  console.log('Conversations:', conversations);
  
  return (
    <div className='conversations-list-container'>
      <ul className="list-group list-group-numbered">
        {conversations.map((conversation) => {
          console.log('Mapping Conversation:', conversation);
          return (
            <li key={conversation._id} className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                {/* Use Link component for navigation to a new conversation_id endpoint whenever a particular conversation.title is clicked */}
                <Link to={`/conversation/${conversation._id}`}>
                  <div className="fw-bold">{conversation.title}</div>
                </Link>
              </div>
              <span className="badge rounded-pill">{conversation.responseCount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConversationsList;



// // This file contains code for the ConversationsList component, used on the bottom of the Home page. In each of three columns there is a container for the headtext of a conversation. If this element is clicked upon it will open up the full conversation (another component)
// import React, { useState, useEffect } from 'react';
// import './ConversationsList.css';
// import { useQuery } from '@apollo/client';
// import { GET_ALL_PUBLIC_CONVERSATIONS } from '../utils/queries'; 

// const ConversationsList = ({expertiseCategory}) => {
//     const [conversations, setConversations] = useState([]);
  
//     const { loading, error, data } = useQuery(GET_ALL_PUBLIC_CONVERSATIONS);
  
//     useEffect(() => {
//       if (data && data.conversations) {
//         setConversations(data.conversations);
//       }
//     }, [data]);
  
//     if (loading) {
//       return <p>Loading...</p>;
//     }
  
//     if (error) {
//       return <p>Error: {error.message}</p>;
//     }

//     // Filter conversations based on expertiseCategory
//     const filteredConversations = conversations.filter(
//       (conversation) => conversation.expertiseCategory === expertiseCategory
//     );

//     return (
//         <div className='conversations-list-container' >
//             <ul className="list-group list-group-numbered">
//               {filteredConversations.map((conversation) => (
//                 <li key={conversation._id} className="list-group-item d-flex justify-content-between align-items-start">
//                     <div className="ms-2 me-auto">
//                       <a href="{`/conversation/${conversation._id}`}">
//                         <div className="fw-bold">{conversation.title}</div>
//                       </a>
//                     </div>
//                     <span className="badge rounded-pill">{conversation.responseCount}</span>
//                 </li>
//               ))}
//             </ul>
//         </div>  
//     );
// };

// // const ConversationsList = () => {
// //     return (
// //       <div className='conversations-list-container' >
// //         <ul className="list-group list-group-numbered">
// //             <li className="list-group-item d-flex justify-content-between align-items-start">
// //                 <div className="ms-2 me-auto">
// //                 <a href="#">
// //                     <div className="fw-bold">ConversationTitleOrFirst8Words</div>
// //                 </a>
// //                     ConversationHeadText
// //                 </div>
// //                 <span className="badge rounded-pill">12</span>
// //             </li>
// //             <li className="list-group-item d-flex justify-content-between align-items-start">
// //                 <div className="ms-2 me-auto">
// //                 <a href="#">
// //                     <div className="fw-bold">ConversationTitleOrFirst8Words</div>
// //                 </a>
// //                     ConversationHeadText
// //                 </div>
// //                 <span className="badge bg-primary rounded-pill">7</span>
// //             </li>
// //             <li className="list-group-item d-flex justify-content-between align-items-start">
// //                 <div className="ms-2 me-auto">
// //                 <a href="#">
// //                     <div className="fw-bold">ConversationTitleOrFirst8Words</div>
// //                 </a>
// //                     ConversationHeadText
// //                 </div>
// //                 <span className="badge bg-primary rounded-pill">33</span>
// //             </li>
// //         </ul>
// //       </div>
// //     );
// //   };
  
//   export default ConversationsList;






// // Filter conversations based on expertiseCategory
  // const filteredConversations = conversations.filter(
  //   (conversation) => {
  //     console.log('Checking conversation:', conversation);
  //     console.log('Matching:', conversation.expertiseCategory === expertiseCategory);
      
  //     return conversation.expertiseCategory === expertiseCategory
  //   }
  // );

  // console.log('Filtered Conversations:', filteredConversations);
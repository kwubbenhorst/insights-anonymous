// This file contains code that will render the Home page/landing page
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import ConversationsList from '../components/ConversationsList';
import Conversation from '../components/Conversation';
import { GET_ALL_PUBLIC_CONVERSATIONS } from '../utils/queries';
import './Home.css'

const Home = () => {
    // Use state to manage the display of conversations and the conditional rendering of the welcome blurb, start a conversation dialogue or detailed conversation view
    const [conversationsByCategory, setConversationsByCategory] = useState(new Map());
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    console.log("What the homepage (parent component) is passing to Conversation component as selectedConversationId:", selectedConversationId); 

    // Expect that conversations will be an array of fetched conversation objects
    const { loading, error, data } = useQuery(GET_ALL_PUBLIC_CONVERSATIONS);

    useEffect(() => {
      console.log("Data in Home component:", data); // Log data to check if it's available
        if (data && data.conversations) {
          // Sorting logic: Group conversations by expertiseCategory
          const categorizedConversations = new Map();
    
          data.conversations.forEach((conversation) => {
            const category = conversation.expertiseCategory;
            if (!categorizedConversations.has(category)) {
                categorizedConversations.set(category, []);
            }
            categorizedConversations.get(category).push(conversation);
          });

          // Log the categorized conversations to see if they are correctly grouped
          console.log("Categorized Conversations:", categorizedConversations);
    
          // Set conversationsByCategory state
          setConversationsByCategory(categorizedConversations);
      }
  }, [data]);
  
  const handleConversationClick = (conversationId) => {
    console.log('Clicked conversation ID:', conversationId);
    setSelectedConversationId(conversationId);
    console.log('Selected conversation ID after update:', selectedConversationId);
  };  

  return (
    <div className="main-content container">
        <div className="row">
            {selectedConversationId ? (
                <Conversation
                    conversationId={selectedConversationId}  
                    onClose={() => setSelectedConversationId(null)}
                />
            ) : (
                <>
                    <div className="col">
                        <div className="welcome-blurb-public-conversation-forum">
                            <h2>Welcome to Insights Anonymous</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae fugiat neque voluptate odio dolores similique esse odit quo sint corporis corrupti rem reiciendis aspernatur ea distinctio iste, qui, voluptates voluptatum! Quaerat officiis earum facilis illum sint exercitationem nostrum! Labore voluptates non corporis! Odit quas corrupti natus, nemo consectetur reiciendis, incidunt officia fuga at iure saepe repellendus non laborum, porro asperiores! Obcaecati impedit enim praesentium hic tenetur nemo velit perspiciatis maxime, molestias at recusandae, omnis eum blanditiis, iure nulla inventore quae provident non nisi soluta numquam sed odio. Tempora neque at sed accusantium voluptatem rerum deleniti ad error accusamus ut, nobis, vitae officiis quas dolorem eius nesciunt culpa minus repellat sapiente praesentium, facilis et itaque? Dolor provident ducimus consequuntur facere repudiandae reiciendis atque alias adipisci dolorum vel eum aliquam omnis eos nisi numquam laudantium explicabo rerum placeat, harum eligendi? Facere perspiciatis enim eum dolore earum expedita? Pariatur accusamus, facere impedit quasi voluptatum aliquid eos nobis beatae atque suscipit culpa aliquam modi reiciendis iusto quisquam similique, laborum totam eveniet distinctio quod alias. Illo ex deserunt, debitis cupiditate itaque suscipit similique fugiat in. Odit, atque eveniet sed natus hic cupiditate ab quis sunt doloremque iste excepturi harum error illo, facere odio quos laboriosam. Architecto sequi doloremque, dolor, animi minima cupiditate consectetur sapiente vero error numquam rerum, dignissimos itaque natus eveniet mollitia amet consequuntur id. Mollitia voluptatem temporibus laudantium, doloribus cupiditate repellendus assumenda autem fugit blanditiis corporis, fugiat, dolor totam est odit dignissimos soluta molestiae? Maiores, quo! Error harum in placeat consequuntur eaque qui!
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
        <div className="row public-conversations-section">
            <div className="col">
                <h3 className="conversations-list-header">Financial</h3>
                <ConversationsList
                    conversations={conversationsByCategory.get('financial') || []}
                    expertiseCategory="Financial"
                    onConversationClick={handleConversationClick}
                />
            </div>
            <div className="col">
                <h3 className="conversations-list-header">Personal</h3>
                <ConversationsList
                    conversations={conversationsByCategory.get('personal') || []}
                    expertiseCategory="Personal"
                    onConversationClick={handleConversationClick}
                />
            </div>
            <div className="col">
                <h3 className="conversations-list-header">Career</h3>
                <ConversationsList
                    conversations={conversationsByCategory.get('career') || []}
                    expertiseCategory="Career"
                    onConversationClick={handleConversationClick}
                />
            </div>
        </div>
        <Outlet />
    </div>
);
};

export default Home;


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
    localStorage.setItem('selectedConversationId', conversationId);
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
                            <h2 id="welcome">Welcome to Insights Anonymous</h2>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore tempora vel labore numquam id, ducimus enim ullam possimus corporis quasi voluptates iure eligendi praesentium reprehenderit ipsum reiciendis, quia culpa ratione dolores. Quae inventore expedita quasi corporis alias aliquam modi placeat magni facilis, assumenda molestiae nulla aperiam atque culpa doloremque sint iste laboriosam voluptate sequi! Aliquam dolorem similique, alias perferendis cumque eos! Possimus, pariatur. Eos quibusdam nostrum placeat nam repellat corporis dolorum aliquid aperiam vero facilis. Exercitationem illum aperiam et nulla officia consectetur consequatur sed sint aspernatur blanditiis. Culpa, sunt dignissimos cumque sit earum et aliquid sapiente quibusdam molestias modi error dolore eveniet mollitia. Totam natus suscipit inventore officia, perferendis repellat quo expedita laudantium debitis rem enim tempora cum voluptas vero a nam? Libero aliquid mollitia quis iste necessitatibus asperiores! Ipsa consectetur alias architecto, voluptate pariatur facere deleniti, repellendus iusto reiciendis perferendis tenetur expedita at tempore quidem. Rerum eos adipisci recusandae ex voluptates. Repellendus et explicabo asperiores praesentium a nam qui sint voluptas nisi quibusdam optio, architecto molestiae beatae consectetur aliquid officia facere laboriosam at? Enim mollitia, fugiat libero voluptate nobis excepturi et voluptatum est quia soluta voluptatem iure veritatis. Error, molestias veritatis. Possimus sit culpa doloremque ut at et commodi animi, tenetur ipsam saepe voluptatem enim modi magni quaerat corrupti unde placeat reprehenderit. Omnis, eaque! Aperiam ea illum rem quisquam distinctio veniam. Assumenda iusto obcaecati porro rem fuga harum, ipsa rerum optio sint similique repellendus suscipit maiores, explicabo velit reiciendis. Reiciendis ratione quaerat rerum tempora cupiditate, accusamus quia at rem?
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


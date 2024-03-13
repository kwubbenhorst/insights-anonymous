// This file contains code that will render the Home page/landing page
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import ConversationsList from '../components/ConversationsList';
import { GET_ALL_PUBLIC_CONVERSATIONS } from '../utils/queries';
import './Home.css'
//import Conversation from '../components/Conversation';

const Home = () => {
    // Use state to manage the display of conversations and the conditional rendering of the welcome blurb, start a conversation dialogue or detailed conversation view
    // const [conversations, setConversations] = useState([]);
    const [conversationsByCategory, setConversationsByCategory] = useState(new Map());
    const [showWelcomeBlurb, setShowWelcomeBlurb] = useState(true);

    const handleConversationClick = () => {
        setShowWelcomeBlurb(!showWelcomeBlurb);
    };

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

      return (
        <div className="main-content container">
          <div className="row">
            <div className="col">
                <div className="welcome-blurb-public-conversation-forum">
                    <h2>Welcome to Insights Anonymous</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem adipisci ullam eligendi molestiae, accusamus minus eum nam sapiente, tenetur assumenda vitae libero nobis! Impedit quaerat molestias adipisci id at magni nostrum doloribus ipsam ex laborum, ducimus dignissimos ut? Earum atque aspernatur, asperiores quod doloribus, quae quisquam libero aliquid ab soluta nulla fugiat laudantium excepturi autem debitis, quas laborum! Eligendi quis repellendus ad. Neque ipsa provident libero optio ipsum autem esse, adipisci sint iste corporis, veritatis cum tenetur cumque, sunt quis similique voluptas dolorem placeat voluptatem pariatur officia corrupti suscipit possimus. Omnis enim modi cupiditate neque quis in laborum, impedit ea dolore a repellendus odit eveniet eos ad blanditiis, accusamus cumque ratione sit quos ab est aliquid, obcaecati ipsum! At et nam corporis eos repellendus repudiandae. Quas consequatur id deserunt laborum, dolorem dolore maxime corporis officiis error eum possimus explicabo quo eos ipsum, quod laudantium! Consequuntur, aliquid praesentium nam tenetur commodi, consectetur fuga similique exercitationem eos fugit eius. Quibusdam ea debitis, ullam quas repellendus quis, amet, laboriosam molestias magni nesciunt beatae ipsa nam quidem. Quas iste in hic nihil illum provident numquam, odit ipsum ab harum placeat exercitationem. Ducimus impedit porro quae eius nostrum. Alias rerum ex adipisci assumenda consequuntur autem vel, earum unde, quas sint vitae minus quasi necessitatibus? Et ipsa illum deserunt nulla hic cumque maiores a, tempora quae placeat dolore necessitatibus magnam eius error facilis debitis. Error odio sunt, cumque temporibus molestiae, eius veniam architecto dignissimos aspernatur perferendis officiis quisquam consequuntur nobis! Omnis magni tempore reprehenderit velit numquam!</p>
                </div>
            </div>
          </div>
          <div className="row public-conversations-section">
            <div className="col">
                <h3 className="conversations-list-header">Financial</h3>
                <ConversationsList conversations={conversationsByCategory.get('Financial') || []} expertiseCategory="Financial" />
            </div>
            <div className="col">
                <h3 className="conversations-list-header">Personal</h3>
                <ConversationsList conversations={conversationsByCategory.get('Personal') || []} expertiseCategory="Personal" />
            </div>
            <div className="col">
                <h3 className="conversations-list-header">Career</h3>
                <ConversationsList conversations={conversationsByCategory.get('Career') || []} expertiseCategory="Career" />
            </div>
        </div>
        <Outlet />
    </div>
  );
};

export default Home;


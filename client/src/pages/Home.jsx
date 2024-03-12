// This file contains code that will render the Home page/landing page
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ConversationsList from '../components/ConversationsList';
import './Home.css'
//import Conversation from '../components/Conversation';

const Home = () => {
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
        <div className="row">
            <div className="col">
                <h2 className="conversations-list-header"Financial>    
                </h2>
                <ConversationsList />
            </div>
            <div className="col">
                <h2 className="conversations-list-header"Personal>    
                </h2>
                <ConversationsList />
            </div>
            <div className="col">
                <h2 className="conversations-list-header"Career>    
                </h2>
                <ConversationsList />
            </div>
        </div>
        <Outlet />
    </div>
  );
};

export default Home;
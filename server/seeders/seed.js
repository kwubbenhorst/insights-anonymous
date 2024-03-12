const db = require('../config/connection'); 
const { User, Conversation, Category } = require('../models'); 
const userSeeds = require('./userSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const conversationSeeds = require('./conversationSeeds.json');
const cleanDB = require('./cleanDB'); 

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');

    await cleanDB('Category', 'categories');

    await cleanDB('Conversation', 'conversations');

    await User.create(userSeeds);

    await Category.create(categorySeeds);

    await Conversation.create(conversationSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seeding complete! 🌱');
  process.exit(0);
});






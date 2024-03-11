const db = require('../config/connection');
const { User, Conversation, Category } = require('../models');
const userSeeds = require('./userSeeds.json');
const conversationSeeds = require('./conversationSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Conversation', 'conversations');

    await cleanDB('User', 'users');

    await cleanDB('Category', 'categories');

    await User.create(userSeeds);

    for (let i = 0; i < conversationSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seeding complete! 🌱');
  process.exit(0);
});
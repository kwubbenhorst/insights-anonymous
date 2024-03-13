const { Schema, model, Types } = require('mongoose');
const moment = require('moment'); // using moment to format dates
// const dateFormat = require('../utils/dateFormat');

const conversationSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    //maxlength: 280,
    trim: true,
  },
  conversationHeadText: { 
    type: String, 
    required: 'To start a conversation, you need to write something here!',
    minlength: 1, 
    // maxlength: 280,
    trim: true, 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    // get: (timestamp) => dateFormat(timestamp)
    get: (createdAt) => moment(createdAt).format('MMM D, YYYY [at] h:mm a') //applies a getter method to format the timestamp on query
  },
  username: {
    type: String,
    required: true,
  },
  isClosed: { 
    type: Boolean, 
    default: false 
  },
  closedAt: {
    type: Date, 
  //   set: function (value) {
  //     return dateFormat(value);
  //   },
  // },
    set: function (value) {
      return moment(value).format('MMM D, YYYY [at] h:mm a'); // Format the date using moment
    },
  },
  valueAtClose: {
    type: Number,
    default: 0,
  },
  isPrivate: { 
    type: Boolean, 
    default: false 
  },
  expertiseCategory: { 
    type: String, 
    required: true 
  },
  responses: [
    {
      responseId: { 
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId() 
      },
      responseText: {
        type: String,
        required: true, 
        minlength: 1, 
        // maxlength: 1000,
      },
      username: {
        type: String, 
        required: true,
      },
      createdAt: { 
        type: Date, 
        default: Date.now, 
        // get: (timestamp) => dateFormat(timestamp)
        get: (createdAt) => moment(createdAt).format('MMM D, YYYY [at] h:mm a') //applies a getter method to format the timestamp on query
      },
    }
  ],
});

// Virtual property to calculate the response count
conversationSchema.virtual('responseCount').get(function () {
  return this.responses.length;
});

// toJSON settings to include getters and setters and exclude _id
conversationSchema.set('toJSON', { getters: true, virtuals: true, id: false });

const Conversation = model('Conversation', conversationSchema);

module.exports = Conversation;


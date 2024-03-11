const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Must match an email address!'],
  },
  password: { 
    type: String, 
    required: true,
    minlength: 5, 
  },
  role: { 
    type: [String], 
    required: true, 
    default: ['speaker'], 
  },
  expertiseCategory: { 
    type: [String], 
    required: false,  //because only those in counselor role will have a value in this field 
  },
  personality: { 
    type: [String], 
    required: true, 
    enum: ['O', '!O', 'C', '!C', 'E', '!E', 'A', '!A', 'N', '!N'], // enum constraint ensures that the values in this field must be one of the specified strings.
  },
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  privateConversation: { 
    type: Schema.Types.ObjectId, 
    ref: 'Conversation' 
  },
  conversationPartner: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
});

// This middleware hashes the user's password before saving it to the database; this.isNew, this.isModified hashes a password in two scenarios: when the user is initially signing up, when they are updating their password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  // The isCorrectPassword method checks that the plain-text password the user has entered matches the stored hashed password for that user in the database.
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;

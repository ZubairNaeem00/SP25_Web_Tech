let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required : true
  },
  password: {
    type: String,
    required : true
  },
  role: { type: String,
     default: 'user' 
  },
  registeredAt: { type: Date,
     default: Date.now }
    },
)

let userModel = mongoose.model("User", userSchema);

module.exports = userModel;
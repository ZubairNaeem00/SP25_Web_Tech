let mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  description : {
    type: String,
  }
});

let categoryModel = mongoose.model("Categories", categorySchema);

module.exports = categoryModel;
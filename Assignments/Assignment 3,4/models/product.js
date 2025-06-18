let mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  product_image : {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required : true
  },
  price: {
    type: String,
    required : true
  },
  product_status: {
    type: String,
    required : true
  },
  sku: {
    type: String,
    required : true
  }
});

let productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
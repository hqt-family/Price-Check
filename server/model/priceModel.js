const mongoose = require("mongoose");

const priceSchema = mongoose.Schema(
  {
    productId: {
      type: Number,
      require: true,
    },
    productImage: {
      type: String,
      require: true,
    },
    productTitle: {
      type: String,
      require: true,
    },
    productPrice: {
      type: Number,
      require: true,
    },
    productUrl: {
      type: String,
      require: true,
    },
    data: {
      type: Array,
      default: [
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
        { link: null },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PriceModel", priceSchema);

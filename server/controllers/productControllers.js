const axios = require("axios");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const keywords = req.query.keywords;
  const response = await axios.get(
    `https://apis.haravan.com/com/products.json?title=${keywords}&limit=5&fields=title,images,handle,variants`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );
  res.status(200).json(response.data.products);
});

module.exports = {
  getProducts,
};

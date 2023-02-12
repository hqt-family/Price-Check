const asyncHandler = require("express-async-handler");
const Price = require("../model/priceModel");
const rp = require("request-promise");
const cheerio = require("cheerio");
const request = require("request");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getPrices = asyncHandler(async (req, res) => {
  const getPrice = await Price.find();
  res.status(200).json(getPrice);
});

const postPrice = asyncHandler(async (req, res) => {
  const { id, title, image, price } = req.body;
  if (!id) {
    res.status(400);
    throw new Error("Missing productID");
  }

  if (!title) {
    res.status(400);
    throw new Error("Missing productTitle");
  }

  if (!image) {
    res.status(400);
    throw new Error("Missing productImage");
  }

  if (!price) {
    res.status(400);
    throw new Error("Missing productPrice");
  }

  const priceExists = await Price.findOne({ productId: id });

  if (priceExists) {
    res.status(200).json(priceExists);
  } else {
    const postPrice = await Price.create({
      productId: id,
      productTitle: title,
      productImage: image,
      productPrice: price,
      data: req.body.data,
    });

    res.status(200).json(postPrice);
  }
});

const putPrice = asyncHandler(async (req, res) => {
  const { id, data } = req.body;
  const updatePrice = await Price.findOne({ productId: id });

  // Xử lý data
  for (i in data) {
    if (data[i].link) {
      try {
        const options = {
          uri: data[i].link,
          headers: {
            'User-Agent': 'Request-Promise'
          },
          transform: function (body) {
            return cheerio.load(body);
          },
        };
        var $ = await rp(options);
      } catch (error) {
        console.log(error);
        return error;
      }

      if (data[i].link.includes("gearvn")) {
        data[i] = {
          brand: "GEAR",
          price: $(".product_sale_price").text().trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("anphatpc")) {
        data[i] = {
          brand: "ANPHATPC",
          price: $(".js-pro-total-price").text().trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("hotgear")) {
        data[i] = {
          brand: "HOTGEARVN",
          price: $(".product_sale_price").text().trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("kccshop")) {
        data[i] = {
          brand: "KCCSHOP",
          price: $(".detail-n-price .n-num").text().trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("gland")) {
        data[i] = {
          brand: "GLAND",
          price: $("#product-info-price .pd-price").text().trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("tplab")) {
        data[i] = {
          brand: "TPLAB",
          price: $("#productPage .productPriceMain").text().trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("phucanh")) {
        data[i] = {
          brand: "PHUCANH",
          price: $("#product-info-price .detail-product-best-price")
            .text()
            .trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("nguyenvu")) {
        data[i] = {
          brand: "NGUYENVU",
          price: Number(
            $('[property="product:price:amount"]').attr("content")
          ).toLocaleString("it-IT", { style: "currency", currency: "VND" }),
          link: data[i].link,
        };
      } else if (data[i].link.includes("tanthanhdanh")) {
        data[i] = {
          brand: "TANTHANHDANH",
          price: Number(
            $('[property="product:price:amount"]').attr("content")
          ).toLocaleString("it-IT", { style: "currency", currency: "VND" }),
          link: data[i].link,
        };
      } else if (data[i].link.includes("nguyencongpc")) {
        data[i] = {
          brand: "NGUYENCONGPC",
          price: $(".detail-price .price").text().trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("hailong")) {
        data[i] = {
          brand: "HAILONG",
          price: Number(
            JSON.parse($("[type='application/ld+json']").text()).offers[0].price
          ).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }),
          link: data[i].link,
        };
      } else if (data[i].link.includes("vitinhlehuy")) {
        data[i] = {
          brand: "LEHUY",
          price: $(".regular-price .price").text().trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("vitinhnguyenthang")) {
        data[i] = {
          brand: "NGUYENTHANG",
          price: $(".bk-product-price").text().trim(),
          link: data[i].link,
        };
      } else if (data[i].link.includes("covapc")) {
        data[i] = {
          brand: "COVAPC",
          price: $('[property="og:price:amount"]').attr("content"),
          link: data[i].link,
        };
      } else if (data[i].link.includes("logitech")) {
        data[i] = {
          brand: "LOGITECH",
          price: $('.pricing-info span').text(),
          link: data[i].link,
        };
      }else if (data[i].link.includes("hacom")) {
        data[i] = {
          brand: "HACOM",
          price: $('#product-info-price #js-pd-price').text(),
          link: data[i].link,
        };
      }
    }
    await sleep(200);
  }
  // Xử lý data

  updatePrice.data = data;
  await updatePrice.save();
  res.status(200).json(updatePrice);
});

const deletePrice = asyncHandler(async (req, res) => {
  const deletePrice = await Price.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPrices,
  postPrice,
  putPrice,
  deletePrice,
};

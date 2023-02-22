const asyncHandler = require("express-async-handler");
const Price = require("../model/priceModel");
const rp = require("request-promise");
const cheerio = require("cheerio");
const request = require("request");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function replaceToNumber(value) {
  value = value.replace(/[^0-9]+/g, "");
  return Number(value);
}

const getPrices = asyncHandler(async (req, res) => {
  const getPrice = await Price.find();
  res.status(200).json(getPrice);
});

const postPrice = asyncHandler(async (req, res) => {
  const { id, title, image, price, url } = req.body;
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

  if (!url) {
    res.status(400);
    throw new Error("Missing productUrl");
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
      productUrl: url,
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
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
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
          price: replaceToNumber($(".product_sale_price").text().trim()),
          link: data[i].link,
        };
      } else if (data[i].link.includes("anphatpc")) {
        data[i] = {
          brand: "ANPHATPC",
          price: replaceToNumber($(".js-pro-total-price").text().trim()),
          link: data[i].link,
        };
      } else if (data[i].link.includes("hotgear")) {
        data[i] = {
          brand: "HOTGEARVN",
          price: replaceToNumber($(".product_sale_price").text().trim()),
          link: data[i].link,
        };
      } else if (data[i].link.includes("kccshop")) {
        data[i] = {
          brand: "KCCSHOP",
          price: replaceToNumber($(".detail-n-price .n-num").text().trim()),
          link: data[i].link,
        };
      } else if (data[i].link.includes("gland")) {
        data[i] = {
          brand: "GLAND",
          price: replaceToNumber(
            $("#product-info-price .pd-price").text().trim()
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("tplab")) {
        data[i] = {
          brand: "TPLAB",
          price: replaceToNumber(
            $("#productPage .productPriceMain").text().trim()
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("phucanh")) {
        data[i] = {
          brand: "PHUCANH",
          price: replaceToNumber(
            $("#product-info-price .detail-product-best-price").text().trim()
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("nguyenvu")) {
        data[i] = {
          brand: "NGUYENVU",
          price: replaceToNumber(
            $('[property="product:price:amount"]').attr("content")
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("tanthanhdanh")) {
        data[i] = {
          brand: "TANTHANHDANH",
          price: replaceToNumber(
            $('[property="product:price:amount"]').attr("content")
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("nguyencongpc")) {
        data[i] = {
          brand: "NGUYENCONGPC",
          price: replaceToNumber($(".detail-price .price").text().trim()),
          link: data[i].link,
        };
      } else if (data[i].link.includes("hailong")) {
        data[i] = {
          brand: "HAILONG",
          price: replaceToNumber(
            JSON.parse($("[type='application/ld+json']").text()).offers[0].price
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("vitinhlehuy")) {
        data[i] = {
          brand: "LEHUY",
          price: replaceToNumber($(".regular-price .price").text().trim()),
          link: data[i].link,
        };
      } else if (data[i].link.includes("vitinhnguyenthang")) {
        data[i] = {
          brand: "NGUYENTHANG",
          price: replaceToNumber($(".bk-product-price").text().trim()),
          link: data[i].link,
        };
      } else if (data[i].link.includes("covapc")) {
        data[i] = {
          brand: "COVAPC",
          price: replaceToNumber(
            $('[property="og:price:amount"]').attr("content")
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("logitech")) {
        data[i] = {
          brand: "LOGITECH",
          price: replaceToNumber(
            JSON.parse(
              $("[type='application/ld+json']").text()
            ).model[0].offers[0].price.split(".")[0]
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("hacom")) {
        data[i] = {
          brand: "HACOM",
          price: replaceToNumber($("#product-info-price #js-pd-price").text()),
          link: data[i].link,
        };
      } else if (data[i].link.includes("lg.com")) {
        data[i] = {
          brand: "LG",
          price: replaceToNumber($("meta[itemprop='price']").attr("content")),
          link: data[i].link,
        };
      } else if (data[i].link.includes("fl-esports")) {
        data[i] = {
          brand: "Fl-esports",
          price: replaceToNumber(
            JSON.parse($('[type="application/ld+json"]').text())["@graph"][6]
              .offers.price
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("akkogear.com")) {
        data[i] = {
          brand: "Akkogear",
          price: replaceToNumber(
            JSON.parse($('[type="application/ld+json"]').last().text())[
              "@graph"
            ][1].offers[0].price
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("edravn.com/")) {
        data[i] = {
          brand: "Edravn",
          price: replaceToNumber(
            $(".p-detail-price-wrap .p-detail-price").text()
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("asus.com")) {
        data[i] = {
          brand: "Asus",
          price: replaceToNumber(
            JSON.parse($('[type="application/ld+json"]').first().text())[0]
              .offers.price
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("tinhocngoisao.com")) {
        data[i] = {
          brand: "Tinhocngoisao",
          price: replaceToNumber(
            $('[property="og:price:amount"]').attr("content")
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("khoavang.vn")) {
        data[i] = {
          brand: "Khoavang",
          price: replaceToNumber($("#pdp-price").val()),
          link: data[i].link,
        };
      } else if (data[i].link.includes("minhancomputer.com")) {
        data[i] = {
          brand: "MinhAnComputer",
          price: replaceToNumber(
            JSON.parse(
              $('[type="application/ld+json"]:contains("price")').text()
            ).offers.lowPrice
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("songphuong.vn")) {
        data[i] = {
          brand: "Songphuong",
          price: replaceToNumber(
            $('[property="product:price:amount"]').attr("content")
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("maytinhbinhduong.com")) {
        data[i] = {
          brand: "Maytinhbinhduong",
          price: replaceToNumber(
            JSON.parse(
              $('[type="application/ld+json"]:contains("price")').text()
            ).offers[0].price
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("memoryzone.com")) {
        data[i] = {
          brand: "Memoryzone",
          price: replaceToNumber(
            $('[property="og:price:amount"]').attr("content")
          ),
          link: data[i].link,
        };
      } else if (data[i].link.includes("lapvip")) {
        console.log($('[type="application/ld+json"]:contains("price")').text());
        // data[i] = {
        //   brand: "Lapvip",
        //   price: replaceToNumber(
        //     JSON.parse(
        //       $('[type="application/ld+json"]:contains("price")').text()
        //     ).offers.price
        //   ),
        //   link: data[i].link,
        // };
      }
    }
    await sleep(200);
  }
  var dataSort = data.sort(({ price: a }, { price: b }) => a - b);

  // Xử lý data

  updatePrice.data = dataSort;
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

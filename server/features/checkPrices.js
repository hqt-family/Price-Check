const cheerio = require("cheerio");
const axios = require("axios");

function replaceToNumber(value) {
  value = value.replace(/[^0-9]+/g, "");
  return Number(value);
}

function replaceToString(value) {
  value = value.replace(/"/g, "");
  return value;
}

function checkOffers(obj, splitValue, format) {
  for (var i in obj) {
    for (var j in obj[i].children) {
      var text = obj[i].children[j].data;
      if (
        text &&
        (text.includes("price") || text.includes("lowPrice")) &&
        text.includes("offers")
      ) {
        if (format === "USD") {
          return (
            replaceToString(text.split(`${splitValue}":`)[1].split(",")[0]) +
            "$"
          );
        } else if (format === "EUR") {
          return (
            replaceToString(text.split(`${splitValue}":`)[1].split(",")[0]) +
            "€"
          );
        } else {
          return replaceToNumber(
            text.split(`${splitValue}":`)[1].split(",")[0]
          );
        }
      }
    }
  }
}

const cellphones = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $("script[type='application/ld+json']");
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Cellphones",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const gearvn = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($('meta[itemprop="price"]').attr("content"));
      return {
        brand: "GEARVN",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const phucanh = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $("script[type='application/ld+json']");
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Phucanh",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const nguyencongpc = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "lowPrice") || null;
      return {
        brand: "NguyencongPC",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const mega = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Mega",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const kccshop = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($(".detail-n-price .n-num").text().trim()) || null;
      return {
        brand: "KCCSHOP",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const tncstore = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "TNC Store",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const npcshop = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "NCP Shop",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const khoavang = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($("#pdp-price").attr("value").trim()) || null;
      return {
        brand: "Khoavang",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const songphuong = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber(
          $('[property="product:price:amount"]').attr("content")
        ) || null;
      return {
        brand: "Songphuong",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const tplab = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($("#productPage .productPriceMain").text().trim()) ||
        null;
      return {
        brand: "tplab",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const gland = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($("#product-info-price .pd-price").text().trim()) ||
        null;
      return {
        brand: "gland",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const memoryzone = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[property="og:price:amount"]').attr("content")) ||
        null;
      return {
        brand: "memoryzone",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const hacom = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "hacom",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const tinhocngoisao = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[property="og:price:amount"]').attr("content")) ||
        null;
      return {
        brand: "tinhocngoisao",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const myboss = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($("span.price_product").attr("data-price").trim()) ||
        null;
      return {
        brand: "Myboss",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const minhancomputer = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "lowPrice") || null;
      return {
        brand: "Minhancomputer",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const sieuthimaychu = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "sieuthimaychu",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const maytinhbinhduong = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "maytinhbinhduong",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const ankhang = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Ankhang",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const phongvu = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "phongvu",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const anphatpc = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "anphatpc",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const xgear = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "xgear",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const playzone = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[property="og:price:amount"]').attr("content")) ||
        null;
      return {
        brand: "playzone",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const dergo = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[property="og:price:amount"]').attr("content")) ||
        null;
      return {
        brand: "dergo",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const ergonomic = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price") || null;
      return {
        brand: "ergonomic",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const themanson = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price") || null;
      return {
        brand: "themanson",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const akko = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price") || null;
      return {
        brand: "akko",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const owlgaming = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price") || null;
      return {
        brand: "owlgaming",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const tmins = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($("#productPage .productPriceMain").text().trim()) ||
        null;
      return {
        brand: "tmins",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const tanthanhdanh = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber(
          $('[property="product:price:amount"]').attr("content")
        ) || null;
      return {
        brand: "tanthanhdanh",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const hotgear = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[property="og:price:amount"]').attr("content")) ||
        null;
      return {
        brand: "hotgear",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const satech = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[property="og:price:amount"]').attr("content")) ||
        null;
      return {
        brand: "satech",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const bpstore = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".bk-product-price").text()) || null;
      return {
        brand: "bpstore",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const hangchinhhieu = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber(
          $('[itemtype="http://schema.org/Product"] [itemprop="price"]').attr(
            "content"
          )
        ) || null;
      return {
        brand: "hangchinhhieu",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const soigear = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[property="og:price:amount"]').attr("content")) ||
        null;
      return {
        brand: "soigear",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const kicap = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[itemprop="price"]').attr("content")) || null;
      return {
        brand: "kicap",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const khanhhan = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[itemprop="price"]').attr("content")) || null;
      return {
        brand: "khanhhan",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const lg = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[itemprop="price"]').attr("content")) || null;
      return {
        brand: "lg",
        price,
        link,
        important: "/brands/lg-logo.png",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const thegioigear = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[property="og:price:amount"]').attr("content")) ||
        null;
      return {
        brand: "thegioigear",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const banghechoigame = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "lowPrice") || null;
      return {
        brand: "banghechoigame",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const logitech = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price") || null;
      return {
        brand: "logitech",
        price,
        link,
        important: "/brands/logitech-logo.png",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const razer = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "lowPrice", "USD") ||
        null;
      return {
        brand: "razer",
        price,
        link,
        important: "/brands/razer-logo.png",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const steelseries = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price", "USD") || null;
      return {
        brand: "steelseries",
        price,
        link,
        important: "/brands/steelseries-logo.png",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const nzxt = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price", "EUR") || null;
      return {
        brand: "nzxt",
        price,
        link,
        important: "/brands/nzxt-logo.png",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const asus = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price") || null;
      return {
        brand: "asus",
        price,
        link,
        important: "/brands/asus-logo.png",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const flEsports = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price") || null;
      return {
        brand: "fl-esports",
        price,
        link,
        important: "/brands/fl-esports.png",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const akkogear = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        checkOffers($('[type="application/ld+json"]'), "price") || null;
      return {
        brand: "akkogear",
        price,
        link,
        important: "/brands/akkogear-logo.png",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const edravn = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($(".p-detail-price-wrap .p-detail-price").text()) ||
        null;
      return {
        brand: "edravn",
        price,
        link,
        important: "/brands/edra-logo.png",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const tnc = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".box-price .price").text()) || null;
      return {
        brand: "tnc",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const haianh = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".bk-product-price").text()) || null;
      return {
        brand: "haianh",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const mixicomputer = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".bk-product-price").text()) || null;
      return {
        brand: "mixicomputer",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const azaudio = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".product-price .price").text()) || null;
      return {
        brand: "azaudio",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const gearshop = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[itemprop="offers"] .amount').text()) || null;
      return {
        brand: "gearshop",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const combatgaming = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($("#product-detail .product-price").text()) || null;
      return {
        brand: "combatgaming",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const hoangphatvn = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($("#product-price-holder").text()) || null;
      return {
        brand: "hoangphatvn",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const saigongear = async (link) => {
  try {
    const response = await axios.get(link);
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($("#product_info .price").text()) || null;
      return {
        brand: "saigongear",
        price,
        link,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const checkPrices = {
  cellphones,
  gearvn,
  phucanh,
  nguyencongpc,
  mega,
  kccshop,
  tncstore,
  npcshop,
  khoavang,
  myboss,
  minhancomputer,
  ankhang,
  songphuong,
  tplab,
  gland,
  sieuthimaychu,
  maytinhbinhduong,
  memoryzone,
  tinhocngoisao,
  hacom,
  phongvu,
  anphatpc,
  xgear,
  playzone,
  dergo,
  themanson,
  ergonomic,
  akko,
  owlgaming,
  tmins,
  tanthanhdanh,
  hotgear,
  satech,
  bpstore,
  hangchinhhieu,
  soigear,
  kicap,
  thegioigear,
  khanhhan,
  banghechoigame,
  lg,
  logitech,
  razer,
  steelseries,
  flEsports,
  akkogear,
  edravn,
  nzxt,
  asus,
  tnc,
  haianh,
  gearshop,
  azaudio,
  mixicomputer,
  combatgaming,
  hoangphatvn,
  saigongear,
};
module.exports = checkPrices;

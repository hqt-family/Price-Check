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
            text.split(`${splitValue}":`)[1].split(",")[0].split(".")[0]
          );
        }
      }
    }
  }
}

const cellphones = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 01}); 
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const gearvn = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($('meta[itemprop="price"]').attr("content"));
      return {
        brand: "GEARVN",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const phucanh = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const nguyencongpc = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const mega = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const kccshop = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const tncstore = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const npcshop = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const khoavang = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($("#pdp-price").attr("value").trim()) || null;
      return {
        brand: "Khoavang",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const songphuong = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const tplab = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const gland = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const memoryzone = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const hacom = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const tinhocngoisao = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const myboss = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const minhancomputer = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const sieuthimaychu = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const maytinhbinhduong = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ankhang = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const phongvu = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const anphatpc = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const xgear = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const playzone = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const dergo = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ergonomic = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const themanson = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const akko = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const owlgaming = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const tmins = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const tanthanhdanh = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const hotgear = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const satech = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const bpstore = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".bk-product-price").text()) || null;
      return {
        brand: "bpstore",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const hangchinhhieu = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const soigear = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const kicap = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const khanhhan = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const lg = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const thegioigear = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const banghechoigame = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const logitech = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const razer = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const steelseries = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const nzxt = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const asus = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const flEsports = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const akkogear = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const edravn = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const tnc = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".box-price .price").text()) || null;
      return {
        brand: "tnc",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const haianh = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".bk-product-price").text()) || null;
      return {
        brand: "haianh",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const mixicomputer = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".bk-product-price").text()) || null;
      return {
        brand: "mixicomputer",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const azaudio = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".product-price .price").text()) || null;
      return {
        brand: "azaudio",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const gearshop = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price =
        replaceToNumber($('[itemprop="offers"] ins .amount').text()) || null;
      return {
        brand: "gearshop",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const combatgaming = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
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
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const hoangphatvn = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($("#product-price-holder").text()) || null;
      return {
        brand: "hoangphatvn",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const saigongear = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($("#product_info .price").text()) || null;
      return {
        brand: "saigongear",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const mediamart = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Mediamart",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const nguyenkim = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Nguyễn Kim",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const quynhoncomputer = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Quy Nhơn Computer",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const tinhocdaiviet = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Tin Học Đại Việt",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const chinhnhan = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($('meta[itemprop="price"]').attr("content"));
      return {
        brand: "Chính Nhân",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ergochair = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber(
        $('meta[property="og:price:amount"]').attr("content")
      );
      return {
        brand: "Ergochair",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const gtchair = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Gtchair",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ergohome = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($('meta[itemprop="price"]').attr("content"));
      return {
        brand: "Ergohome",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const dandihome = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "lowPrice") || null;
      return {
        brand: "Dandihome",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const beegaming = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "lowPrice") || null;
      return {
        brand: "Beegaming",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const phukienmaytinh = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Phụ Kiện Máy Tính",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const eagear = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Eagear",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ahstore = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Ahstore",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const maytinhhd = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Máy Tính HD",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ezpc = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "EZPC",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const thinkpro = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "Thinkpro",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const phongcachxanh = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "phongcachxanh",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const kythuatsovn = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "kythuatsovn",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const vnsup = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "vnsup",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const dellpc = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber(
        $('meta[property="og:price:amount"]').attr("content")
      );
      return {
        brand: "dellpc",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const maianhpc = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "maianhpc",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const mypc = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "mypc",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const punstore = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "punstore",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const laptop123 = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "laptop123",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const benCom = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "ben",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const hugotech = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber(
        $('meta[property="product:price:amount"]').attr("content")
      );
      return {
        brand: "hugotech",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const shopcom = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "shopcom",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const logitechg = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "logitechg",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const mygear = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var obj = $('[type="application/ld+json"]');
      var price = checkOffers(obj, "price") || null;
      return {
        brand: "mygear",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const maytinhbienhoa = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber(
        $('meta[property="og:price:amount"]').attr("content")
      );
      return {
        brand: "maytinhbienhoa",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const chuvu = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber(
        $('meta[property="og:price:amount"]').attr("content")
      );
      return {
        brand: "chuvu",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const nguyenvu = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber(
        $('meta[property="product:price:amount"]').attr("content")
      );
      return {
        brand: "nguyenvu",
        price,
        link,
      };
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const apshop = async (link) => {
  try {
    const response = await axios.get(link, { maxRedirects: 1 });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber(
        $('meta[property="og:price:amount"]').attr("content")
      );
      return price;
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const checkPrices = {
  mygear,
  logitechg,
  nguyenvu,
  chuvu,
  maytinhbienhoa,
  shopcom,
  hugotech,
  benCom,
  laptop123,
  punstore,
  mypc,
  maianhpc,
  dellpc,
  vnsup,
  kythuatsovn,
  phongcachxanh,
  thinkpro,
  ezpc,
  maytinhhd,
  ahstore,
  eagear,
  phukienmaytinh,
  beegaming,
  dandihome,
  ergohome,
  gtchair,
  ergochair,
  chinhnhan,
  tinhocdaiviet,
  quynhoncomputer,
  nguyenkim,
  mediamart,
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
  apshop,
};
module.exports = checkPrices;

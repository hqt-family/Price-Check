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
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    console.log(link);
    return;
  }
};

const gearvn = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($('meta[itemprop="price"]').attr("content"));
      return {
        brand: "GEARVN",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const phucanh = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const nguyencongpc = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const mega = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const kccshop = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const tncstore = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const npcshop = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const khoavang = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($("#pdp-price").attr("value").trim()) || null;
      return {
        brand: "Khoavang",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const songphuong = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const tplab = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const gland = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const memoryzone = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const hacom = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const tinhocngoisao = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const myboss = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const minhancomputer = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const sieuthimaychu = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const maytinhbinhduong = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const ankhang = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const phongvu = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const anphatpc = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const xgear = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const playzone = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const dergo = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const ergonomic = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const themanson = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const akko = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const owlgaming = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const tmins = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const tanthanhdanh = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const hotgear = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const satech = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const bpstore = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".bk-product-price").text()) || null;
      return {
        brand: "bpstore",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const hangchinhhieu = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const soigear = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const kicap = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const khanhhan = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const lg = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const thegioigear = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const banghechoigame = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const logitech = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const razer = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const steelseries = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const nzxt = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const asus = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const flEsports = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const akkogear = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const edravn = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const tnc = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".box-price .price").text()) || null;
      return {
        brand: "tnc",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const haianh = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".bk-product-price").text()) || null;
      return {
        brand: "haianh",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const mixicomputer = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".bk-product-price").text()) || null;
      return {
        brand: "mixicomputer",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const azaudio = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($(".product-price .price").text()) || null;
      return {
        brand: "azaudio",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const gearshop = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const combatgaming = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const hoangphatvn = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($("#product-price-holder").text()) || null;
      return {
        brand: "hoangphatvn",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const saigongear = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($("#product_info .price").text()) || null;
      return {
        brand: "saigongear",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const mediamart = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const nguyenkim = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const quynhoncomputer = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const tinhocdaiviet = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const chinhnhan = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($('meta[itemprop="price"]').attr("content"));
      return {
        brand: "Chính Nhân",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const ergochair = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const gtchair = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const ergohome = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber($('meta[itemprop="price"]').attr("content"));
      return {
        brand: "Ergohome",
        price,
        link,
      };
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const dandihome = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const beegaming = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const phukienmaytinh = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const eagear = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const ahstore = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const maytinhhd = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const ezpc = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const thinkpro = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const phongcachxanh = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const kythuatsovn = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const vnsup = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const dellpc = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const maianhpc = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const mypc = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const punstore = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const laptop123 = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const benCom = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const hugotech = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const shopcom = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const logitechg = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const mygear = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const maytinhbienhoa = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const chuvu = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const nguyenvu = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
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
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const apshop = async (link) => {
  try {
    const response = await axios.get(link, {
      maxRedirects: 0,
      timeout: 3000,
      validateStatus: function (status) {
        return status >= 200 && status <= 300;
      },
    });
    const data = (response && response.data) || null;
    if (data) {
      const $ = cheerio.load(response.data);
      var price = replaceToNumber(
        $('meta[property="og:price:amount"]').attr("content")
      );
      return price;
    } else {
      return;
    }
  } catch (error) {
    return;
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

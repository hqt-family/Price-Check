const asyncHandler = require("express-async-handler");
const Price = require("../model/priceModel");
const checkPrices = require("../features/checkPrices");
const axios = require("axios");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getPrices = asyncHandler(async (req, res) => {
  const getPrice = await Price.find();
  res.status(200).json(getPrice);
});

const postPrice = asyncHandler(async (req, res) => {
  const { id, price, url } = req.body;
  if (!id) {
    res.status(400);
    throw new Error("Missing productID");
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
    if (price !== priceExists.productPrice) {
      priceExists.productPrice = price;
      priceExists.save();
    }
    res.status(200).json(priceExists);
  } else {
    const postPrice = await Price.create({
      productId: id,
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

  const response = await axios.get(
    `https://apis.haravan.com/com/products/${id}.json?fields=title,images,handle,variants`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );

  updatePrice.productPrice = response.data.product.variants[0].price;
  updatePrice.data = data;
  await updatePrice.save();
  // Xử lý data
  for (i in data) {
    if (data[i].link) {
      if (data[i].link.includes("cellphones")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.cellphones(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("gearvn")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.gearvn(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("phucanh")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.phucanh(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("nguyencongpc")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.nguyencongpc(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("mega")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.mega(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("kccshop")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.kccshop(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("tncstore")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.tncstore(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("npcshop")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.npcshop(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("khoavang")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.khoavang(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("myboss")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.myboss(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("minhancomputer")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.minhancomputer(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("ankhang")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.ankhang(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("songphuong")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.songphuong(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("tplab")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.tplab(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("gland")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.gland(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("sieuthimaychu")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.sieuthimaychu(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("maytinhbinhduong")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.maytinhbinhduong(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("memoryzone")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.memoryzone(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("tinhocngoisao")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.tinhocngoisao(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("hacom")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.hacom(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("phongvu")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.phongvu(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("anphatpc")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.anphatpc(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("xgear")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.xgear(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("playzone")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.playzone(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("dergo")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.dergo(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("themanson")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.themanson(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("ergonomic")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.ergonomic(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("akko.com")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.akko(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("owlgaming")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.owlgaming(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("tmins")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.tmins(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("tanthanhdanh")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.tanthanhdanh(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("hotgear")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.hotgear(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("satech")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.satech(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("bpstore")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.bpstore(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("hangchinhhieu")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.hangchinhhieu(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("soigear")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.soigear(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("kicap")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.kicap(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("thegioigear")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.thegioigear(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("khanhhan")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.khanhhan(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("banghechoigame")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.banghechoigame(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("lg.com")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.lg(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("logitech.com")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.logitech(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("razer")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.razer(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("steelseries")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.steelseries(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("fl-esports")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.flEsports(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("akkogear")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.akkogear(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("edravn")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.edravn(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("nzxt")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.nzxt(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("asus.com")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.asus(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("tnc.com")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.tnc(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("haianh.vn")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.haianh(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("gearshop.vn")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.gearshop(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("azaudio.vn")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.azaudio(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("mixicomputer.vn")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.mixicomputer(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("combatgaming.vn")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.combatgaming(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("hoangphatvn.vn")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.hoangphatvn(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("saigongear.vn")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.saigongear(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      } else if (data[i].link.includes("fptshop.com")) {
        let flagLink = data[i].link;
        data[i] = await checkPrices.fptshop(flagLink);
        if (!data[i].price) {
          data[i] = { link: flagLink };
        }
      }
    }
  }
  var dataSort = data.sort(({ price: a }, { price: b }) => a - b);
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

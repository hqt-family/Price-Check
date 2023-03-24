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
    if (data[i] && Object.keys(data[i]).length !== 0) {
      const link = data[i].link || "";
      switch (true) {
        case link.includes("cellphones"):
          data[i] = (await checkPrices.cellphones(link)) || { link };
          break;
        case link.includes("gearvn"):
          data[i] = (await checkPrices.gearvn(link)) || { link };
          break;
        case link.includes("phucanh"):
          data[i] = (await checkPrices.phucanh(link)) || { link };
          break;
        case link.includes("nguyencongpc"):
          data[i] = (await checkPrices.nguyencongpc(link)) || { link };
          break;
        case link.includes("mega"):
          data[i] = (await checkPrices.mega(link)) || { link };
          break;
        case link.includes("kccshop"):
          data[i] = (await checkPrices.kccshop(link)) || { link };
          break;
        case link.includes("tncstore"):
          data[i] = (await checkPrices.tncstore(link)) || { link };
          break;
        case link.includes("npcshop"):
          data[i] = (await checkPrices.npcshop(link)) || { link };
          break;
        case link.includes("khoavang"):
          data[i] = (await checkPrices.khoavang(link)) || { link };
          break;
        case link.includes("myboss"):
          data[i] = (await checkPrices.myboss(link)) || { link };
          break;
        case link.includes("minhancomputer"):
          data[i] = (await checkPrices.minhancomputer(link)) || { link };
          break;
        case link.includes("ankhang"):
          data[i] = (await checkPrices.ankhang(link)) || { link };
          break;
        case link.includes("songphuong"):
          data[i] = (await checkPrices.songphuong(link)) || { link };
          break;
        case link.includes("tplab"):
          data[i] = (await checkPrices.tplab(link)) || { link };
          break;
        case link.includes("gland"):
          data[i] = (await checkPrices.gland(link)) || { link };
          break;
        case link.includes("sieuthimaychu"):
          data[i] = (await checkPrices.sieuthimaychu(link)) || { link };
          break;
        case link.includes("maytinhbinhduong"):
          data[i] = (await checkPrices.maytinhbinhduong(link)) || { link };
          break;
        case link.includes("memoryzone"):
          data[i] = (await checkPrices.memoryzone(link)) || { link };
          break;
        case link.includes("tinhocngoisao"):
          data[i] = (await checkPrices.tinhocngoisao(link)) || { link };
          break;
        case link.includes("hacom"):
          data[i] = (await checkPrices.hacom(link)) || { link };
          break;
        case link.includes("phongvu"):
          data[i] = (await checkPrices.phongvu(link)) || { link };
          break;
        case link.includes("anphatpc"):
          data[i] = (await checkPrices.anphatpc(link)) || { link };
          break;
        case link.includes("xgear"):
          data[i] = (await checkPrices.xgear(link)) || { link };
          break;
        case link.includes("playzone"):
          data[i] = (await checkPrices.playzone(link)) || { link };
          break;
        case link.includes("dergo"):
          data[i] = (await checkPrices.dergo(link)) || { link };
          break;
        case link.includes("themanson"):
          data[i] = (await checkPrices.themanson(link)) || { link };
          break;
        case link.includes("ergonomic.com"):
          data[i] = (await checkPrices.ergonomic(link)) || { link };
          break;
        case link.includes("akko.com"):
          data[i] = (await checkPrices.akko(link)) || { link };
          break;
        case link.includes("owlgaming"):
          data[i] = (await checkPrices.owlgaming(link)) || { link };
          break;
        case link.includes("tmins"):
          data[i] = (await checkPrices.tmins(link)) || { link };
          break;
        case link.includes("tanthanhdanh"):
          data[i] = (await checkPrices.tanthanhdanh(link)) || { link };
          break;
        case link.includes("hotgear"):
          data[i] = (await checkPrices.hotgear(link)) || { link };
          break;
        case link.includes("satech"):
          data[i] = (await checkPrices.satech(link)) || { link };
          break;
        case link.includes("bpstore"):
          data[i] = (await checkPrices.bpstore(link)) || { link };
          break;
        case link.includes("hangchinhhieu"):
          data[i] = (await checkPrices.hangchinhhieu(link)) || { link };
          break;
        case link.includes("soigear"):
          data[i] = (await checkPrices.soigear(link)) || { link };
          break;
        case link.includes("kicap"):
          data[i] = (await checkPrices.kicap(link)) || { link };
          break;
        case link.includes("thegioigear"):
          data[i] = (await checkPrices.thegioigear(link)) || { link };
          break;
        case link.includes("khanhhan"):
          data[i] = (await checkPrices.khanhhan(link)) || { link };
          break;
        case link.includes("banghechoigame"):
          data[i] = (await checkPrices.banghechoigame(link)) || { link };
          break;
        case link.includes("lg.com"):
          data[i] = (await checkPrices.lg(link)) || { link };
          break;
        case link.includes("logitech.com"):
          data[i] = (await checkPrices.logitech(link)) || { link };
          break;
        case link.includes("razer.com"):
          data[i] = (await checkPrices.razer(link)) || { link };
          break;
        case link.includes("steelseries"):
          data[i] = (await checkPrices.steelseries(link)) || { link };
          break;
        case link.includes("fl-esports.vn"):
          data[i] = (await checkPrices.flEsports(link)) || { link };
          break;
        case link.includes("akkogear"):
          data[i] = (await checkPrices.akkogear(link)) || { link };
          break;
        case link.includes("edravn"):
          data[i] = (await checkPrices.edravn(link)) || { link };
          break;
        case link.includes("nzxt"):
          data[i] = (await checkPrices.nzxt(link)) || { link };
          break;
        case link.includes("asus.com"):
          data[i] = (await checkPrices.asus(link)) || { link };
          break;
        case link.includes("tnc.com"):
          data[i] = (await checkPrices.tnc(link)) || { link };
          break;
        case link.includes("haianh.vn"):
          data[i] = (await checkPrices.haianh(link)) || { link };
          break;
        case link.includes("gearshop.vn"):
          data[i] = (await checkPrices.gearshop(link)) || { link };
          break;
        case link.includes("azaudio.vn"):
          data[i] = (await checkPrices.azaudio(link)) || { link };
          break;
        case link.includes("mixicomputer.vn"):
          data[i] = (await checkPrices.mixicomputer(link)) || { link };
          break;
        case link.includes("combatgaming.vn"):
          data[i] = (await checkPrices.combatgaming(link)) || { link };
          break;
        case link.includes("hoangphatvn.vn"):
          data[i] = (await checkPrices.hoangphatvn(link)) || { link };
          break;
        case link.includes("saigongear.vn"):
          data[i] = (await checkPrices.saigongear(link)) || { link };
          break;
        case link.includes("fptshop.com"):
          data[i] = (await checkPrices.fptshop(link)) || { link };
          break;
        case link.includes("mediamart"):
          data[i] = (await checkPrices.mediamart(link)) || { link };
          break;
        case link.includes("nguyenkim.com"):
          data[i] = (await checkPrices.nguyenkim(link)) || { link };
          break;
        case link.includes("quynhoncomputer"):
          data[i] = (await checkPrices.quynhoncomputer(link)) || { link };
          break;
        case link.includes("tinhocdaiviet"):
          data[i] = (await checkPrices.tinhocdaiviet(link)) || { link };
          break;
        case link.includes("chinhnhan"):
          data[i] = (await checkPrices.chinhnhan(link)) || { link };
          break;
        case link.includes("ergochair.vn"):
          data[i] = (await checkPrices.ergochair(link)) || { link };
          break;
        case link.includes("gtchair.com"):
          data[i] = (await checkPrices.gtchair(link)) || { link };
          break;
        case link.includes("ergohome.vn"):
          data[i] = (await checkPrices.ergohome(link)) || { link };
          break;
        case link.includes("dandihome.vn"):
          data[i] = (await checkPrices.dandihome(link)) || { link };
          break;
        case link.includes("beegaming"):
          data[i] = (await checkPrices.beegaming(link)) || { link };
          break;
        case link.includes("phukienmaytinh.vn"):
          data[i] = (await checkPrices.phukienmaytinh(link)) || { link };
          break;
        case link.includes("eagear.vn"):
          data[i] = (await checkPrices.eagear(link)) || { link };
          break;
        case link.includes("ahstore.vn"):
          data[i] = (await checkPrices.ahstore(link)) || { link };
          break;
        case link.includes("maytinhhd.com"):
          data[i] = (await checkPrices.maytinhhd(link)) || { link };
          break;
        case link.includes("ezpc.vn"):
          data[i] = (await checkPrices.ezpc(link)) || { link };
          break;
        case link.includes("thinkpro"):
          data[i] = (await checkPrices.thinkpro(link)) || { link };
          break;
        case link.includes("phongcachxanh.vn"):
          data[i] = (await checkPrices.phongcachxanh(link)) || { link };
          break;
        case link.includes("kythuatsovn.net"):
          data[i] = (await checkPrices.kythuatsovn(link)) || { link };
          break;
        case link.includes("vnsup.com"):
          data[i] = (await checkPrices.vnsup(link)) || { link };
          break;
        case link.includes("dellpc.vn"):
          data[i] = (await checkPrices.dellpc(link)) || { link };
          break;
        case link.includes("maianhpc.vn"):
          data[i] = (await checkPrices.maianhpc(link)) || { link };
          break;
        case link.includes("mypc.vn"):
          data[i] = (await checkPrices.mypc(link)) || { link };
          break;
        case link.includes("punstore.vn"):
          data[i] = (await checkPrices.punstore(link)) || { link };
          break;
        case link.includes("laptop123.com.vn"):
          data[i] = (await checkPrices.laptop123(link)) || { link };
          break;
        case link.includes("ben.com.vn"):
          data[i] = (await checkPrices.benCom(link)) || { link };
          break;
        case link.includes("hugotech.vn"):
          data[i] = (await checkPrices.hugotech(link)) || { link };
          break;
        case link.includes("shopcom.vn"):
          data[i] = (await checkPrices.shopcom(link)) || { link };
          break;
        case link.includes("maytinhbienhoa.vn"):
          data[i] = (await checkPrices.maytinhbienhoa(link)) || { link };
          break;
        case link.includes("chuvu.vn"):
          data[i] = (await checkPrices.chuvu(link)) || { link };
          break;
        case link.includes("nguyenvu.store"):
          data[i] = (await checkPrices.nguyenvu(link)) || { link };
          break;
        default:
          break;
      }
    } else {
      data[i] = { link: null };
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

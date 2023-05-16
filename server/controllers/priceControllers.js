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
  const { id, title, image, url } = req.body;
  const price = (await checkPrices.apshop(url)) || 0;
  if (id === undefined) {
    res.status(400);
    throw new Error("Missing productID");
  }

  if (title === undefined) {
    res.status(400);
    throw new Error("Missing productTitle");
  }

  if (image === undefined) {
    res.status(400);
    throw new Error("Missing productImage");
  }

  if (price === undefined) {
    res.status(400);
    throw new Error("Missing productPrice");
  }

  if (url === undefined) {
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

  const response = await axios.get(
    `https://apis.haravan.com/com/products/${id}.json?fields=title,images,handle,variants`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );
  updatePrice.productTitle = response.data.product.title;
  updatePrice.productImage = response.data.product.images
    ? response.data.product.images[0].src
    : "";
  updatePrice.productPrice = await checkPrices.apshop(
    `https://apshop.vn/products/${response.data.product.handle}`
  );
  updatePrice.data = data;
  await updatePrice.save();
  // Xử lý data
  await Promise.all(
    data.map(async (item, key) => {
      if (item && typeof item.link !== undefined) {
        const link = data[key].link || "";
        switch (true) {
          /*case link.includes("cellphones"):
            data[key] = (await checkPrices.cellphones(link)) || { link };
            break;*/
          case link.includes("gearvn"):
            data[key] = (await checkPrices.gearvn(link)) || { link };
            break;
          case link.includes("phucanh"):
            data[key] = (await checkPrices.phucanh(link)) || { link };
            break;
          case link.includes("nguyencongpc"):
            data[key] = (await checkPrices.nguyencongpc(link)) || { link };
            break;
          case link.includes("mega"):
            data[key] = (await checkPrices.mega(link)) || { link };
            break;
          case link.includes("kccshop"):
            data[key] = (await checkPrices.kccshop(link)) || { link };
            break;
          case link.includes("tncstore"):
            data[key] = (await checkPrices.tncstore(link)) || { link };
            break;
          case link.includes("npcshop"):
            data[key] = (await checkPrices.npcshop(link)) || { link };
            break;
          case link.includes("khoavang"):
            data[key] = (await checkPrices.khoavang(link)) || { link };
            break;
          case link.includes("myboss"):
            data[key] = (await checkPrices.myboss(link)) || { link };
            break;
          case link.includes("minhancomputer"):
            data[key] = (await checkPrices.minhancomputer(link)) || { link };
            break;
          case link.includes("ankhang"):
            data[key] = (await checkPrices.ankhang(link)) || { link };
            break;
          case link.includes("songphuong"):
            data[key] = (await checkPrices.songphuong(link)) || { link };
            break;
          case link.includes("tplab"):
            data[key] = (await checkPrices.tplab(link)) || { link };
            break;
          case link.includes("gland"):
            data[key] = (await checkPrices.gland(link)) || { link };
            break;
          case link.includes("sieuthimaychu"):
            data[key] = (await checkPrices.sieuthimaychu(link)) || { link };
            break;
          case link.includes("maytinhbinhduong"):
            data[key] = (await checkPrices.maytinhbinhduong(link)) || { link };
            break;
          case link.includes("memoryzone"):
            data[key] = (await checkPrices.memoryzone(link)) || { link };
            break;
          case link.includes("tinhocngoisao"):
            data[key] = (await checkPrices.tinhocngoisao(link)) || { link };
            break;
          case link.includes("hacom"):
            data[key] = (await checkPrices.hacom(link)) || { link };
            break;
          case link.includes("phongvu"):
            data[key] = (await checkPrices.phongvu(link)) || { link };
            break;
          case link.includes("anphatpc"):
            data[key] = (await checkPrices.anphatpc(link)) || { link };
            break;
          case link.includes("xgear"):
            data[key] = (await checkPrices.xgear(link)) || { link };
            break;
          case link.includes("playzone"):
            data[key] = (await checkPrices.playzone(link)) || { link };
            break;
          case link.includes("dergo"):
            data[key] = (await checkPrices.dergo(link)) || { link };
            break;
          case link.includes("themanson"):
            data[key] = (await checkPrices.themanson(link)) || { link };
            break;
          case link.includes("ergonomic.com"):
            data[key] = (await checkPrices.ergonomic(link)) || { link };
            break;
          case link.includes("akko.com"):
            data[key] = (await checkPrices.akko(link)) || { link };
            break;
          case link.includes("owlgaming"):
            data[key] = (await checkPrices.owlgaming(link)) || { link };
            break;
          case link.includes("tmins"):
            data[key] = (await checkPrices.tmins(link)) || { link };
            break;
          case link.includes("tanthanhdanh"):
            data[key] = (await checkPrices.tanthanhdanh(link)) || { link };
            break;
          case link.includes("hotgear"):
            data[key] = (await checkPrices.hotgear(link)) || { link };
            break;
          case link.includes("satech"):
            data[key] = (await checkPrices.satech(link)) || { link };
            break;
          case link.includes("bpstore"):
            data[key] = (await checkPrices.bpstore(link)) || { link };
            break;
          case link.includes("hangchinhhieu"):
            data[key] = (await checkPrices.hangchinhhieu(link)) || { link };
            break;
          case link.includes("soigear"):
            data[key] = (await checkPrices.soigear(link)) || { link };
            break;
          case link.includes("kicap"):
            data[key] = (await checkPrices.kicap(link)) || { link };
            break;
          case link.includes("thegioigear"):
            data[key] = (await checkPrices.thegioigear(link)) || { link };
            break;
          case link.includes("khanhhan"):
            data[key] = (await checkPrices.khanhhan(link)) || { link };
            break;
          case link.includes("banghechoigame"):
            data[key] = (await checkPrices.banghechoigame(link)) || { link };
            break;
          case link.includes("lg.com"):
            data[key] = (await checkPrices.lg(link)) || { link };
            break;
          case link.includes("logitech.com"):
            data[key] = (await checkPrices.logitech(link)) || { link };
            break;
          case link.includes("razer.com"):
            data[key] = (await checkPrices.razer(link)) || { link };
            break;
          case link.includes("steelseries"):
            data[key] = (await checkPrices.steelseries(link)) || { link };
            break;
          case link.includes("fl-esports.vn"):
            data[key] = (await checkPrices.flEsports(link)) || { link };
            break;
          case link.includes("akkogear"):
            data[key] = (await checkPrices.akkogear(link)) || { link };
            break;
          case link.includes("edravn"):
            data[key] = (await checkPrices.edravn(link)) || { link };
            break;
          case link.includes("nzxt"):
            data[key] = (await checkPrices.nzxt(link)) || { link };
            break;
          case link.includes("asus.com"):
            data[key] = (await checkPrices.asus(link)) || { link };
            break;
          case link.includes("tnc.com"):
            data[key] = (await checkPrices.tnc(link)) || { link };
            break;
          case link.includes("haianh.vn"):
            data[key] = (await checkPrices.haianh(link)) || { link };
            break;
          case link.includes("gearshop.vn"):
            data[key] = (await checkPrices.gearshop(link)) || { link };
            break;
          case link.includes("azaudio.vn"):
            data[key] = (await checkPrices.azaudio(link)) || { link };
            break;
          case link.includes("mixicomputer.vn"):
            data[key] = (await checkPrices.mixicomputer(link)) || { link };
            break;
          case link.includes("combatgaming.vn"):
            data[key] = (await checkPrices.combatgaming(link)) || { link };
            break;
          case link.includes("hoangphatvn.vn"):
            data[key] = (await checkPrices.hoangphatvn(link)) || { link };
            break;
          case link.includes("saigongear.vn"):
            data[key] = (await checkPrices.saigongear(link)) || { link };
            break;
          case link.includes("fptshop.com"):
            data[key] = (await checkPrices.fptshop(link)) || { link };
            break;
          case link.includes("mediamart"):
            data[key] = (await checkPrices.mediamart(link)) || { link };
            break;
          case link.includes("nguyenkim.com"):
            data[key] = (await checkPrices.nguyenkim(link)) || { link };
            break;
          case link.includes("quynhoncomputer"):
            data[key] = (await checkPrices.quynhoncomputer(link)) || { link };
            break;
          case link.includes("tinhocdaiviet"):
            data[key] = (await checkPrices.tinhocdaiviet(link)) || { link };
            break;
          case link.includes("chinhnhan"):
            data[key] = (await checkPrices.chinhnhan(link)) || { link };
            break;
          case link.includes("ergochair.vn"):
            data[key] = (await checkPrices.ergochair(link)) || { link };
            break;
          case link.includes("gtchair.com"):
            data[key] = (await checkPrices.gtchair(link)) || { link };
            break;
          case link.includes("ergohome.vn"):
            data[key] = (await checkPrices.ergohome(link)) || { link };
            break;
          case link.includes("dandihome.vn"):
            data[key] = (await checkPrices.dandihome(link)) || { link };
            break;
          case link.includes("beegaming"):
            data[key] = (await checkPrices.beegaming(link)) || { link };
            break;
          case link.includes("phukienmaytinh.vn"):
            data[key] = (await checkPrices.phukienmaytinh(link)) || { link };
            break;
          case link.includes("eagear.vn"):
            data[key] = (await checkPrices.eagear(link)) || { link };
            break;
          case link.includes("ahstore.vn"):
            data[key] = (await checkPrices.ahstore(link)) || { link };
            break;
          case link.includes("maytinhhd.com"):
            data[key] = (await checkPrices.maytinhhd(link)) || { link };
            break;
          case link.includes("ezpc.vn"):
            data[key] = (await checkPrices.ezpc(link)) || { link };
            break;
          case link.includes("thinkpro"):
            data[key] = (await checkPrices.thinkpro(link)) || { link };
            break;
          case link.includes("phongcachxanh.vn"):
            data[key] = (await checkPrices.phongcachxanh(link)) || { link };
            break;
          case link.includes("kythuatsovn.net"):
            data[key] = (await checkPrices.kythuatsovn(link)) || { link };
            break;
          case link.includes("vnsup.com"):
            data[key] = (await checkPrices.vnsup(link)) || { link };
            break;
          case link.includes("dellpc.vn"):
            data[key] = (await checkPrices.dellpc(link)) || { link };
            break;
          case link.includes("maianhpc.vn"):
            data[key] = (await checkPrices.maianhpc(link)) || { link };
            break;
          case link.includes("mypc.vn"):
            data[key] = (await checkPrices.mypc(link)) || { link };
            break;
          case link.includes("punstore.vn"):
            data[key] = (await checkPrices.punstore(link)) || { link };
            break;
          case link.includes("laptop123.com.vn"):
            data[key] = (await checkPrices.laptop123(link)) || { link };
            break;
          case link.includes("ben.com.vn"):
            data[key] = (await checkPrices.benCom(link)) || { link };
            break;
          case link.includes("hugotech.vn"):
            data[key] = (await checkPrices.hugotech(link)) || { link };
            break;
          case link.includes("shopcom.vn"):
            data[key] = (await checkPrices.shopcom(link)) || { link };
            break;
          case link.includes("maytinhbienhoa.vn"):
            data[key] = (await checkPrices.maytinhbienhoa(link)) || { link };
            break;
          case link.includes("chuvu.vn"):
            data[key] = (await checkPrices.chuvu(link)) || { link };
            break;
          case link.includes("nguyenvu.store"):
            data[key] = (await checkPrices.nguyenvu(link)) || { link };
            break;
          case link.includes("logitechg.com"):
            data[key] = (await checkPrices.logitechg(link)) || { link };
            break;
          case link.includes("mygear.vn"):
            data[key] = (await checkPrices.mygear(link)) || { link };
            break;
          default:
            break;
        }
      } else {
        data[key] = { link: null };
      }
    })
  );
  var dataSort = data.sort(({ price: a }, { price: b }) => {
    if (a === undefined) {
      return 1;
    }

    if (b === undefined) {
      return -1;
    }

    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  });
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

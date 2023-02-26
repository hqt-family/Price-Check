const asyncHandler = require("express-async-handler");
const Price = require("../model/priceModel");
const checkPrices = require("../features/checkPrices");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  updatePrice.data = data;
  await updatePrice.save();
  // Xử lý data
  for (i in data) {
    if (data[i].link) {
      if (data[i].link.includes("cellphones")) {
        data[i] = await checkPrices.cellphones(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của cellphones");
        }
      } else if (data[i].link.includes("gearvn")) {
        data[i] = await checkPrices.gearvn(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của gearvn");
        }
      } else if (data[i].link.includes("phucanh")) {
        data[i] = await checkPrices.phucanh(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của phucanh");
        }
      } else if (data[i].link.includes("nguyencongpc")) {
        data[i] = await checkPrices.nguyencongpc(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của nguyencongpc");
        }
      } else if (data[i].link.includes("mega")) {
        data[i] = await checkPrices.mega(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của mega");
        }
      } else if (data[i].link.includes("kccshop")) {
        data[i] = await checkPrices.kccshop(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của kccshop");
        }
      } else if (data[i].link.includes("tncstore")) {
        data[i] = await checkPrices.tncstore(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của tncstore");
        }
      } else if (data[i].link.includes("npcshop")) {
        data[i] = await checkPrices.npcshop(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của npcshop");
        }
      } else if (data[i].link.includes("khoavang")) {
        data[i] = await checkPrices.khoavang(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của khoavang");
        }
      } else if (data[i].link.includes("myboss")) {
        data[i] = await checkPrices.myboss(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của myboss");
        }
      } else if (data[i].link.includes("minhancomputer")) {
        data[i] = await checkPrices.minhancomputer(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của minhancomputer");
        }
      } else if (data[i].link.includes("ankhang")) {
        data[i] = await checkPrices.ankhang(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của ankhang");
        }
      } else if (data[i].link.includes("songphuong")) {
        data[i] = await checkPrices.songphuong(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của songphuong");
        }
      } else if (data[i].link.includes("tplab")) {
        data[i] = await checkPrices.tplab(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của tplab");
        }
      } else if (data[i].link.includes("gland")) {
        data[i] = await checkPrices.gland(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của gland");
        }
      } else if (data[i].link.includes("sieuthimaychu")) {
        data[i] = await checkPrices.sieuthimaychu(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của sieuthimaychu");
        }
      } else if (data[i].link.includes("maytinhbinhduong")) {
        data[i] = await checkPrices.maytinhbinhduong(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của maytinhbinhduong");
        }
      } else if (data[i].link.includes("memoryzone")) {
        data[i] = await checkPrices.memoryzone(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của memoryzone");
        }
      } else if (data[i].link.includes("tinhocngoisao")) {
        data[i] = await checkPrices.tinhocngoisao(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của tinhocngoisao");
        }
      } else if (data[i].link.includes("hacom")) {
        data[i] = await checkPrices.hacom(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của hacom");
        }
      } else if (data[i].link.includes("phongvu")) {
        data[i] = await checkPrices.phongvu(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của phongvu");
        }
      } else if (data[i].link.includes("anphatpc")) {
        data[i] = await checkPrices.anphatpc(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của anphatpc");
        }
      } else if (data[i].link.includes("xgear")) {
        data[i] = await checkPrices.xgear(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của xgear");
        }
      } else if (data[i].link.includes("playzone")) {
        data[i] = await checkPrices.playzone(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của playzone");
        }
      } else if (data[i].link.includes("dergo")) {
        data[i] = await checkPrices.dergo(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của dergo");
        }
      } else if (data[i].link.includes("themanson")) {
        data[i] = await checkPrices.themanson(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của themanson");
        }
      } else if (data[i].link.includes("ergonomic")) {
        data[i] = await checkPrices.ergonomic(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của ergonomic");
        }
      } else if (data[i].link.includes("akko.com")) {
        data[i] = await checkPrices.akko(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của akko");
        }
      } else if (data[i].link.includes("owlgaming")) {
        data[i] = await checkPrices.owlgaming(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của owlgaming");
        }
      } else if (data[i].link.includes("tmins")) {
        data[i] = await checkPrices.tmins(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của tmins");
        }
      } else if (data[i].link.includes("tanthanhdanh")) {
        data[i] = await checkPrices.tanthanhdanh(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của tanthanhdanh");
        }
      } else if (data[i].link.includes("hotgear")) {
        data[i] = await checkPrices.hotgear(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của hotgear");
        }
      } else if (data[i].link.includes("satech")) {
        data[i] = await checkPrices.satech(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của satech");
        }
      } else if (data[i].link.includes("bpstore")) {
        data[i] = await checkPrices.bpstore(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của bpstore");
        }
      } else if (data[i].link.includes("hangchinhhieu")) {
        data[i] = await checkPrices.hangchinhhieu(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của hangchinhhieu");
        }
      } else if (data[i].link.includes("soigear")) {
        data[i] = await checkPrices.soigear(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của soigear");
        }
      } else if (data[i].link.includes("kicap")) {
        data[i] = await checkPrices.kicap(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của kicap");
        }
      } else if (data[i].link.includes("thegioigear")) {
        data[i] = await checkPrices.thegioigear(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của thegioigear");
        }
      } else if (data[i].link.includes("khanhhan")) {
        data[i] = await checkPrices.khanhhan(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của khanhhan");
        }
      } else if (data[i].link.includes("banghechoigame")) {
        data[i] = await checkPrices.banghechoigame(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của banghechoigame");
        }
      } else if (data[i].link.includes("lg")) {
        data[i] = await checkPrices.lg(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của lg");
        }
      } else if (data[i].link.includes("logitech")) {
        data[i] = await checkPrices.logitech(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của logitech");
        }
      } else if (data[i].link.includes("razer")) {
        data[i] = await checkPrices.razer(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của razer");
        }
      } else if (data[i].link.includes("steelseries")) {
        data[i] = await checkPrices.steelseries(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của steelseries");
        }
      }
      else if (data[i].link.includes("fl-esports")) {
        data[i] = await checkPrices.flEsports(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của fl-esports");
        }
      } else if (data[i].link.includes("akkogear")) {
        data[i] = await checkPrices.akkogear(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của akkogear");
        }
      } else if (data[i].link.includes("edravn")) {
        data[i] = await checkPrices.edravn(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của edravn");
        }
      } else if (data[i].link.includes("nzxt")) {
        data[i] = await checkPrices.nzxt(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của nzxt");
        }
      } else if (data[i].link.includes("asus.com")) {
        data[i] = await checkPrices.asus(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của asus");
        }
      }
      // }  else if (data[i].link.includes("nguyenvu")) {
      //   data[i] = {
      //     brand: "NGUYENVU",
      //     price: replaceToNumber(
      //       $('[property="product:price:amount"]').attr("content")
      //     ),
      //     link: data[i].link,
      //   };
      // }   else if (data[i].link.includes("hailong")) {
      //   data[i] = {
      //     brand: "HAILONG",
      //     price: replaceToNumber(
      //       JSON.parse($("[type='application/ld+json']").text()).offers[0].price
      //     ),
      //     link: data[i].link,
      //   };
      // } else if (data[i].link.includes("vitinhlehuy")) {
      //   data[i] = {
      //     brand: "LEHUY",
      //     price: replaceToNumber($(".regular-price .price").text().trim()),
      //     link: data[i].link,
      //   };
      // } else if (data[i].link.includes("vitinhnguyenthang")) {
      //   data[i] = {
      //     brand: "NGUYENTHANG",
      //     price: replaceToNumber($(".bk-product-price").text().trim()),
      //     link: data[i].link,
      //   };
      // } else if (data[i].link.includes("covapc")) {
      //   data[i] = {
      //     brand: "COVAPC",
      //     price: replaceToNumber(
      //       $('[property="og:price:amount"]').attr("content")
      //     ),
      //     link: data[i].link,
      //   };
      // }  else if (data[i].link.includes("lapvip")) {
      //   console.log($('[type="application/ld+json"]:contains("price")').text());
      //   // data[i] = {
      //   //   brand: "Lapvip",
      //   //   price: replaceToNumber(
      //   //     JSON.parse(
      //   //       $('[type="application/ld+json"]:contains("price")').text()
      //   //     ).offers.price
      //   //   ),
      //   //   link: data[i].link,
      //   // };
      // }
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

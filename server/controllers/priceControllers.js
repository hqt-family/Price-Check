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
      } else if (data[i].link.includes("logitech.com")) {
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
      } else if (data[i].link.includes("fl-esports")) {
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
      } else if (data[i].link.includes("tnc.com")) {
        data[i] = await checkPrices.tnc(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của tnc");
        }
      } else if (data[i].link.includes("haianh.vn")) {
        data[i] = await checkPrices.haianh(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của haianh");
        }
      } else if (data[i].link.includes("gearshop.vn")) {
        data[i] = await checkPrices.gearshop(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của gearshop");
        }
      } else if (data[i].link.includes("azaudio.vn")) {
        data[i] = await checkPrices.azaudio(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của azaudio");
        }
      } else if (data[i].link.includes("mixicomputer.vn")) {
        data[i] = await checkPrices.mixicomputer(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của mixicomputer");
        }
      } else if (data[i].link.includes("combatgaming.vn")) {
        data[i] = await checkPrices.combatgaming(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của combatgaming");
        }
      } else if (data[i].link.includes("hoangphatvn.vn")) {
        data[i] = await checkPrices.hoangphatvn(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của hoangphatvn");
        }
      } else if (data[i].link.includes("saigongear.vn")) {
        data[i] = await checkPrices.saigongear(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của saigongear");
        }
      } else if (data[i].link.includes("fptshop.com")) {
        data[i] = await checkPrices.fptshop(data[i].link);
        if (!data[i].price) {
          res.status(400);
          throw new Error("Không thể cập nhật giá của fptshop");
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

const putSingle = asyncHandler(async (req, res) => {
  const { id, link, stt } = req.body;
  console.log(id, link, stt);
  const updatePrice = await Price.findOne({ productId: id });
  updatePrice.data[stt].link = link;
  const data = updatePrice.data;
  await updatePrice.save();
  // Xử lý data
  if (data[stt].link) {
    if (data[stt].link.includes("cellphones")) {
      data[stt] = await checkPrices.cellphones(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của cellphones");
      }
    } else if (data[stt].link.includes("gearvn")) {
      data[stt] = await checkPrices.gearvn(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của gearvn");
      }
    } else if (data[stt].link.includes("phucanh")) {
      data[stt] = await checkPrices.phucanh(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của phucanh");
      }
    } else if (data[stt].link.includes("nguyencongpc")) {
      data[stt] = await checkPrices.nguyencongpc(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của nguyencongpc");
      }
    } else if (data[stt].link.includes("mega")) {
      data[stt] = await checkPrices.mega(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của mega");
      }
    } else if (data[stt].link.includes("kccshop")) {
      data[stt] = await checkPrices.kccshop(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của kccshop");
      }
    } else if (data[stt].link.includes("tncstore")) {
      data[stt] = await checkPrices.tncstore(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của tncstore");
      }
    } else if (data[stt].link.includes("npcshop")) {
      data[stt] = await checkPrices.npcshop(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của npcshop");
      }
    } else if (data[stt].link.includes("khoavang")) {
      data[stt] = await checkPrices.khoavang(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của khoavang");
      }
    } else if (data[stt].link.includes("myboss")) {
      data[stt] = await checkPrices.myboss(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của myboss");
      }
    } else if (data[stt].link.includes("minhancomputer")) {
      data[stt] = await checkPrices.minhancomputer(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của minhancomputer");
      }
    } else if (data[stt].link.includes("ankhang")) {
      data[stt] = await checkPrices.ankhang(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của ankhang");
      }
    } else if (data[stt].link.includes("songphuong")) {
      data[stt] = await checkPrices.songphuong(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của songphuong");
      }
    } else if (data[stt].link.includes("tplab")) {
      data[stt] = await checkPrices.tplab(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của tplab");
      }
    } else if (data[stt].link.includes("gland")) {
      data[stt] = await checkPrices.gland(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của gland");
      }
    } else if (data[stt].link.includes("sieuthimaychu")) {
      data[stt] = await checkPrices.sieuthimaychu(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của sieuthimaychu");
      }
    } else if (data[stt].link.includes("maytinhbinhduong")) {
      data[stt] = await checkPrices.maytinhbinhduong(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của maytinhbinhduong");
      }
    } else if (data[stt].link.includes("memoryzone")) {
      data[stt] = await checkPrices.memoryzone(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của memoryzone");
      }
    } else if (data[stt].link.includes("tinhocngoisao")) {
      data[stt] = await checkPrices.tinhocngoisao(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của tinhocngoisao");
      }
    } else if (data[stt].link.includes("hacom")) {
      data[stt] = await checkPrices.hacom(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của hacom");
      }
    } else if (data[stt].link.includes("phongvu")) {
      data[stt] = await checkPrices.phongvu(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của phongvu");
      }
    } else if (data[stt].link.includes("anphatpc")) {
      data[stt] = await checkPrices.anphatpc(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của anphatpc");
      }
    } else if (data[stt].link.includes("xgear")) {
      data[stt] = await checkPrices.xgear(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của xgear");
      }
    } else if (data[stt].link.includes("playzone")) {
      data[stt] = await checkPrices.playzone(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của playzone");
      }
    } else if (data[stt].link.includes("dergo")) {
      data[stt] = await checkPrices.dergo(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của dergo");
      }
    } else if (data[stt].link.includes("themanson")) {
      data[stt] = await checkPrices.themanson(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của themanson");
      }
    } else if (data[stt].link.includes("ergonomic")) {
      data[stt] = await checkPrices.ergonomic(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của ergonomic");
      }
    } else if (data[stt].link.includes("akko.com")) {
      data[stt] = await checkPrices.akko(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của akko");
      }
    } else if (data[stt].link.includes("owlgaming")) {
      data[stt] = await checkPrices.owlgaming(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của owlgaming");
      }
    } else if (data[stt].link.includes("tmins")) {
      data[stt] = await checkPrices.tmins(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của tmins");
      }
    } else if (data[stt].link.includes("tanthanhdanh")) {
      data[stt] = await checkPrices.tanthanhdanh(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của tanthanhdanh");
      }
    } else if (data[stt].link.includes("hotgear")) {
      data[stt] = await checkPrices.hotgear(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của hotgear");
      }
    } else if (data[stt].link.includes("satech")) {
      data[stt] = await checkPrices.satech(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của satech");
      }
    } else if (data[stt].link.includes("bpstore")) {
      data[stt] = await checkPrices.bpstore(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của bpstore");
      }
    } else if (data[stt].link.includes("hangchinhhieu")) {
      data[stt] = await checkPrices.hangchinhhieu(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của hangchinhhieu");
      }
    } else if (data[stt].link.includes("soigear")) {
      data[stt] = await checkPrices.soigear(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của soigear");
      }
    } else if (data[stt].link.includes("kicap")) {
      data[stt] = await checkPrices.kicap(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của kicap");
      }
    } else if (data[stt].link.includes("thegioigear")) {
      data[stt] = await checkPrices.thegioigear(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của thegioigear");
      }
    } else if (data[stt].link.includes("khanhhan")) {
      data[stt] = await checkPrices.khanhhan(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của khanhhan");
      }
    } else if (data[stt].link.includes("banghechoigame")) {
      data[stt] = await checkPrices.banghechoigame(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của banghechoigame");
      }
    } else if (data[stt].link.includes("lg")) {
      data[stt] = await checkPrices.lg(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của lg");
      }
    } else if (data[stt].link.includes("logitech.com")) {
      data[stt] = await checkPrices.logitech(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của logitech");
      }
    } else if (data[stt].link.includes("razer")) {
      data[stt] = await checkPrices.razer(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của razer");
      }
    } else if (data[stt].link.includes("steelseries")) {
      data[stt] = await checkPrices.steelseries(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của steelseries");
      }
    } else if (data[stt].link.includes("fl-esports")) {
      data[stt] = await checkPrices.flEsports(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của fl-esports");
      }
    } else if (data[stt].link.includes("akkogear")) {
      data[stt] = await checkPrices.akkogear(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của akkogear");
      }
    } else if (data[stt].link.includes("edravn")) {
      data[stt] = await checkPrices.edravn(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của edravn");
      }
    } else if (data[stt].link.includes("nzxt")) {
      data[stt] = await checkPrices.nzxt(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của nzxt");
      }
    } else if (data[stt].link.includes("asus.com")) {
      data[stt] = await checkPrices.asus(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của asus");
      }
    } else if (data[stt].link.includes("tnc.com")) {
      data[stt] = await checkPrices.tnc(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của tnc");
      }
    } else if (data[stt].link.includes("haianh.vn")) {
      data[stt] = await checkPrices.haianh(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của haianh");
      }
    } else if (data[stt].link.includes("gearshop.vn")) {
      data[stt] = await checkPrices.gearshop(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của gearshop");
      }
    } else if (data[stt].link.includes("azaudio.vn")) {
      data[stt] = await checkPrices.azaudio(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của azaudio");
      }
    } else if (data[stt].link.includes("mixicomputer.vn")) {
      data[stt] = await checkPrices.mixicomputer(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của mixicomputer");
      }
    } else if (data[stt].link.includes("combatgaming.vn")) {
      data[stt] = await checkPrices.combatgaming(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của combatgaming");
      }
    } else if (data[stt].link.includes("hoangphatvn.vn")) {
      data[stt] = await checkPrices.hoangphatvn(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của hoangphatvn");
      }
    } else if (data[stt].link.includes("saigongear.vn")) {
      data[stt] = await checkPrices.saigongear(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của saigongear");
      }
    } else if (data[stt].link.includes("fptshop.com")) {
      data[stt] = await checkPrices.fptshop(data[stt].link);
      if (!data[stt].price) {
        res.status(400);
        throw new Error("Không thể cập nhật giá của fptshop");
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
  putSingle,
  deletePrice,
};

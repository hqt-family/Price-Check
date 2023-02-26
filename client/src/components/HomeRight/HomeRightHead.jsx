import React from "react";
function HomeRightHead(props) {
  const prices = props.data || null;
  return (
    <div className="home-right-head">
      {prices ? (
        <div className="row">
          <div className="col-6">
            <div className="text-center item-important">
              <a
                target="_blank"
                href={prices.productUrl && prices.productUrl}
                rel="noreferrer"
              >
                <img
                  className="p-2"
                  width="120"
                  height="120"
                  src="/brands/ap-logo.png"
                  alt={prices.productUrl && prices.productTitle}
                />
              </a>
              <h5 className="mt-2">
                <strong>
                  {prices.productPrice &&
                    prices.productPrice
                      .toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                      .replace(/\sVND/g, "₫")}
                </strong>
              </h5>
            </div>
          </div>
          <div className="col-6 border-left item-important">
            {prices.data &&
              prices.data.map(
                (value, key) =>
                  value.important && (
                    <div className="text-center">
                      <a
                        href={value.link && value.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="p-2"
                          height="120"
                          width="120"
                          src={value.important && value.important}
                          alt={value.link && value.brand}
                        />
                      </a>
                      <h5 className="mt-2">
                        <strong>
                          {value.price &&
                            value.price
                              .toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })
                              .replace(/\sVND/g, "₫")}
                        </strong>
                      </h5>
                    </div>
                  )
              )}
          </div>
        </div>
      ) : (
        <p>Vui lòng chọn sản phẩm cần kiểm tra!</p>
      )}
    </div>
  );
}

export default HomeRightHead;

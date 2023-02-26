import React from "react";
function HomeRightHead(props) {
  const prices = props.data || null;
  return (
    <div className="home-right-head">
      {prices ? (
        <div className="row">
          <div className="col-2">
            <img
              src={prices.productImage && prices.productImage}
              alt={prices.productUrl && prices.productTitle}
            />
          </div>
          <div className="col-10">
            <h4>
              <a
                target="_blank"
                href={prices.productUrl && prices.productUrl}
                rel="noreferrer"
              >
                {prices.productTitle && prices.productTitle}
              </a>
            </h4>
            <strong>
              {prices.productPrice &&
                prices.productPrice
                  .toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                  .replace(/\sVND/g, "₫")}
            </strong>
          </div>
        </div>
      ) : (
        <p>Vui lòng chọn sản phẩm cần kiểm tra!</p>
      )}
    </div>
  );
}

export default HomeRightHead;

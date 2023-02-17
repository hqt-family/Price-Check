import React from "react";
function HomeRightHead(props) {
  const prices = props.data;
  return (
    <div className="home-right-head">
      {prices ? (
        <div className="row">
          <div className="col-2">
            <img src={prices.productImage} alt={prices.productTitle} />
          </div>
          <div className="col-10">
            <h4>
              <a target="_blank" href={prices.productUrl} rel="noreferrer">
                {prices.productTitle}
              </a>
            </h4>
            <strong>
              {prices.productPrice
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

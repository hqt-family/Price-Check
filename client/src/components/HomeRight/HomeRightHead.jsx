import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function HomeRightHead() {
  const { prices, isError, message } = useSelector(
    (state) => state.prices
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [prices, isError, message]);

  return (
    <div className="home-right-head">
      {prices ? (
        <div className="row">
          <div className="col-2">
            <img src={prices.productImage} alt={prices.productTitle} />
          </div>
          <div className="col-10">
            <h3>{prices.productTitle}</h3>
            <strong>{prices.productPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong>
          </div>
        </div>
      ) : (
        <p>Vui lòng chọn sản phẩm cần kiểm tra!</p>
      )}
    </div>
  );
}

export default HomeRightHead;

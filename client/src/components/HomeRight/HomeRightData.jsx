import React from "react";
import HomeRightDataYes from "./HomeRightDataYes";

function HomeRightData(props) {
  const authExits = localStorage.getItem("user");
  const prices = props.data;
  const onChange = (e) => {
    let newFormData = [...props.formData];
    newFormData[e.target.attributes["data-stt"].value] = {
      link: e.target.value,
    };
    props.setFormData(newFormData);
  };

  const onClick = (e) => {
    console.log(e.target);
    let newFormData = [...props.formData];
    newFormData[e.target.attributes["data-stt"].value] = {
      link: null,
    };
    props.setFormData(newFormData);
  };
  return (
    <>
      {prices && (
        <div className="home-right-data-top d-flex justify-content-between align-items-center w-100">
          <div className="home-right-data-top-title">
            Chênh lệch so với giá nhỏ nhất:
            <strong className="ml-1">
              {prices.data[0].price &&
                prices.productPrice - prices.data[0].price > 0 &&
                "Cao hơn "}
              {prices.data[0].price ? (
                (prices.productPrice - prices.data[0].price)
                  .toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                  .replace("-", "Rẻ hơn ")
                  .replace(/\sVND/g, "₫")
              ) : (
                <>Chưa có</>
              )}
            </strong>
          </div>
          {authExits && JSON.parse(authExits).permission !== "member" && (
            <button type="submit" className="btn home-right-data-top-title">
              <i className="fa fa-spinner"></i> Cập nhật
            </button>
          )}
        </div>
      )}
      {prices &&
        props.formData &&
        props.formData.map((data, index) =>
          data.link ? (
            <HomeRightDataYes
              key={index}
              brand={data.brand}
              price={data.price}
              link={data.link}
              stt={index}
              onClick={onClick}
            />
          ) : (
            authExits &&
            JSON.parse(authExits).permission !== "member" && (
              <div className="form-group home-right-data-item" key={index}>
                <input
                  type="text"
                  className="form-control"
                  data-stt={index}
                  onChange={(e) => onChange(e)}
                />
              </div>
            )
          )
        )}
    </>
  );
}

export default HomeRightData;

import React from "react";

function HomeRightDataYes(props) {
  const authExits = localStorage.getItem("user");
  return (
    <div className="home-right-data-item">
      <div className="row">
        <div className="col-sm-5 col-12 home-right-data-item-title">
          <a target="_blank" rel="noreferrer" href={props.link}>
            <strong className={props.important && "color-red"}>
              {props.brand ? String(props.brand).toUpperCase() : props.link}
            </strong>
          </a>
        </div>
        <div className="col-sm-5 col-12 text-right home-right-data-item-price">
          {props.price ? (
            !String(props.price).includes("$") ? (
              props.price
                .toLocaleString("it-IT", { style: "currency", currency: "VND" })
                .replace(/\sVND/g, "₫")
            ) : (
              props.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            )
          ) : (
            <></>
          )}
        </div>
        {authExits && JSON.parse(authExits).permission !== "member" && (
          <div className="col-2 text-right home-right-data-item-action">
            <button
              type="button"
              className="btn btn-block p-0"
              onClick={props.onClick}
              data-stt={props.stt}
            >
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeRightDataYes;

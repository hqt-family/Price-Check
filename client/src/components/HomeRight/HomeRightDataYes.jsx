import React from "react";

function HomeRightDataYes(props) {
  return (
    <div className="home-right-data-item">
      <div className="row">
        <div className="col-5">
          <a target="_blank" rel="noreferrer" href={props.link}>
            {props.brand}
          </a>
        </div>
        <div className="col-5 text-right">
          {props.price && props.price
            .toLocaleString("it-IT", { style: "currency", currency: "VND" })
            .replace(/\sVND/g, "₫")}
        </div>
        <div className="col-2 text-right">
          <button
            type="button"
            className="btn btn-block p-0"
            onClick={props.onClick}
            data-stt={props.stt}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeRightDataYes;

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
        <div className="col-4">{props.price}</div>
        <div className="col-3">
          <div className="form-group">
            <button type="button" className="btn btn-block"><i class="fa fa-trash" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRightDataYes;

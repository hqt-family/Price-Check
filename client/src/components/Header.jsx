import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="col-12 d-flex align-items-center justify-content-between pt-3">
      <div className="col-2">
        <h1 className="m-0">
          <Link to="/">
            <img
              src="https://theme.hstatic.net/1000129940/1000985708/14/header-left-logo.png?v=591"
              alt="APSHOP"
            />
          </Link>
        </h1>
      </div>
      <div className="col-2 text-right">
        <Link
          className="text-decoration-none text-secondary"
          to={props.navigate}
        >
          {props.navigateText}
        </Link>
      </div>
    </div>
  );
}

export default Header;

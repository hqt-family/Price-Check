import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function Header(props) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(logout());
  };
  return (
    <div className="col-12 d-flex align-items-center justify-content-between pt-3">
      <div className="col-sm-2 col-7">
        <h1 className="m-0">
          <Link to="/">
            <img
              src="https://theme.hstatic.net/1000129940/1000985708/14/header-left-logo.png?v=591"
              alt="APSHOP"
            />
          </Link>
        </h1>
      </div>
      <div className="col-sm-3 col-5 text-right">
        {props.master === "master" && (
          <Link
            className="text-decoration-none text-secondary"
            to={props.navigate}
          >
            {props.navigateText}
          </Link>
        )}

        <button
          type="button"
          className="logOut text-decoration-none text-secondary"
          onClick={onClick}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default Header;

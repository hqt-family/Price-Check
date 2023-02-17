import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import User from "../components/Users/User";
import { get } from "../features/auth/authSlice";

export default function Users() {
  const { all } = useSelector((state) => state.auth);
  const authExits = localStorage.getItem("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authExits) {
      navigate("/login");
    } else {
      dispatch(get({ permission: JSON.parse(authExits).permission }));
    }
  }, [dispatch, authExits, navigate]);
  return (
    <>
      <Header
        navigate="/"
        navigateText="Trang chủ"
        master={authExits && JSON.parse(authExits).permission}
      />
      <div className="home">
        <div className="col-12">
          <div className="boxContainer">
            <strong className="headingTitle">Danh sách tài khoản</strong>
            <div className="row mt-3 d-flex align-items-center">
              <div className="col-2">
                <strong>Tên truy cập</strong>
              </div>
              <div className="col-7">
                <strong className="pl-3">Quyền quản trị</strong>
              </div>
            </div>
            <ul className="mt-4">
              {all ? (
                all.length > 0 &&
                all.map((member, index) => <User key={index} data={member} />)
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

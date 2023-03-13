import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "../components/Users/User";
import { get } from "../features/auth/authSlice";

export default function Users({ user }) {
  const { allUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(get({ permission: user.permission }));
    }
  }, [dispatch, user, navigate]);
  return (
    <div className="home">
      <div className="boxContainer">
        <strong className="headingTitle">Danh sách tài khoản</strong>
        <div className="row mt-3 d-flex align-items-center">
          <div className="col-5 col-sm-2">
            <strong>Tên truy cập</strong>
          </div>
          <div className="col-7">
            <strong className="pl-3">Quyền quản trị</strong>
          </div>
        </div>
        <ul className="mt-3">
          {allUser ? (
            allUser.length > 0 &&
            allUser.map((member, index) => <User key={index} data={member} />)
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
}

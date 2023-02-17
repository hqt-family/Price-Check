import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import HomeLeft from "../components/HomeLeft/HomeLeft";
import HomeRight from "../components/HomeRight/HomeRight";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    }
  }, [isError, isSuccess, user, navigate, dispatch, message]);
  return (
    <>
      <Header
        navigate="/users"
        navigateText="Quản lý tài khoản"
        master={user && user.permission}
      />
      <div className="col-md-12 row home">
        <div className="col-md-6">
          <HomeLeft />
        </div>
        <div className="col-md-6">
          <HomeRight />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

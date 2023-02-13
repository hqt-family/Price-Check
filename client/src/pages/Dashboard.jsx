import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import HomeLeft from "../components/HomeLeft/HomeLeft";
import HomeRight from "../components/HomeRight/HomeRight";

function Dashboard() {
  const navigate = useNavigate();
  const { user, isSuccess, isError, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError){
      toast.error(message);
    }
    if(isSuccess || user){
      
    }
    const authExits = localStorage.getItem("user");
    if (!authExits) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Header navigate="/users" navigateText="Quản lý tài khoản" />
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

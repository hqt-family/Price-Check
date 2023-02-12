import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLeft from "../components/HomeLeft/HomeLeft";
import HomeRight from "../components/HomeRight/HomeRight";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div className="col-md-12 row home">
      <div className="col-md-6">
        <HomeLeft />
      </div>
      <div className="col-md-6">
        <HomeRight />
      </div>
    </div>
  );
}

export default Dashboard;

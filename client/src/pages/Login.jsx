import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const { name, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      password,
    };

    dispatch(login(userData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="pageLogin">
        <section className="heading">
          <img
            src="https://theme.hstatic.net/1000129940/1000985708/14/header-left-logo.png?v=591"
            alt="APSHOP"
          />
          <p>
            * Bạn đang yêu cầu truy cập vào trình kiểm tra giá sản phẩm. Vui
            lòng nhập địa chỉ name và mật khẩu để xác thực
          </p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Địa chỉ name"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Mật khẩu"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Tiếp tục
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;

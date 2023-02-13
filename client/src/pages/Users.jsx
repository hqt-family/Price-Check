import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { get } from "../features/auth/authSlice";

export default function Users() {
  const [permission, setPermission] = useState({
    id: null,
    permission: null
  });
  const { user, isError, message, all } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(get({ permission: user.permission }));
  }, [isError, message, dispatch, user.permission]);

  const onChange = (e) => {
    setPermission({
      id: e.target.attributes["data-id"].value,
      permission: e.target.value
    })
  }
  return (
    <>
      <Header navigate="/" navigateText="Trang chủ" />
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
                all.map((member) => (
                  <li className="py-2 row d-flex align-items-center">
                    <div className="col-2">{member.name}</div>
                    <div className="form-group m-0 col-7">
                      <select
                        data-id={member._id}
                        className="ml-3 form-control"
                        defaultValue={ member.permission }
                        onChange={ onChange }
                      >
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                      </select>
                    </div>
                  </li>
                ))
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

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../features/auth/authSlice";

function User(props) {
  let member = props.data;
  const [user, setUser] = useState({
    id: "",
    permission: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    user.permission && dispatch(update(user));
  }, [dispatch, user]);
  const onChange = (e) => {
    setUser({
      ...user,
      id: e.target.attributes["data-id"].value,
      permission: e.target.value,
    });
  };
  return (
    <li className="py-2 row d-flex align-items-center">
      <div className="col-2">{member.name}</div>
      <div className="form-group m-0 col-7">
        <select
          data-id={member._id}
          className="ml-3 form-control"
          defaultValue={user.permission || member.permission}
          onChange={(e) => onChange(e)}
        >
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
      </div>
    </li>
  );
}

export default User;

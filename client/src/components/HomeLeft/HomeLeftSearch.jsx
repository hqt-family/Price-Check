import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAll, getFilter } from "../../features/products/productSlice";

function HomeLeftSearch() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (value === "") {
        dispatch(getAll({ limit: 7, page: 1 }));
      } else {
        dispatch(getFilter({ keywords: value }));
      }
    }, 750);
    return () => clearTimeout(timeOutId);
  }, [value, dispatch]);

  return (
    <div className="home-left-search">
      <strong>Danh sách sản phẩm</strong>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="search-product"
            name="search-product"
            placeholder="Nhập tên sản phẩm cần tìm kiếm"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default HomeLeftSearch;

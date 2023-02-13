import { useEffect, useState } from "react";
import HomeLeftData from "./HomeLeftData";
import HomeLeftSearch from "./HomeLeftSearch";
import { useDispatch } from "react-redux";
import { getAll, getFilter } from "../../features/products/productSlice";

function HomeLeft() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (value === "") {
        dispatch(getAll({ limit: 8, page: 1 }));
      } else {
        dispatch(getFilter({ keywords: value }));
      }
    }, 750);
    return () => clearTimeout(timeOutId);
  }, [value, dispatch]);
  return (
    <div className="home-left">
      <HomeLeftSearch value={value} setValue={setValue} />
      <HomeLeftData />
    </div>
  );
}

export default HomeLeft;

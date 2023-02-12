import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePrices } from "../../features/prices/priceSlice";

function HomeRightDataNo(props) {
  const { prices } = useSelector((state) => state.prices);
  const [link, setLink] = useState({ link: null });
  const dispatch = useDispatch();
  const newData = prices ? prices.data : [];
  const onSubmit = (e) => {
    e.preventDefault();
    const arrCopy = [...newData];
    arrCopy[props.stt] = link;
    dispatch(updatePrices({ id: props.id, data: arrCopy }));
  };
  return (
    <form
      className="home-right-data-item"
      onSubmit={onSubmit}
      data-id={props.id}
      data-stt={props.stt}
    >
      <div className="form-group row">
        <input
          type="text"
          className="form-control col-9"
          onChange={(event) => setLink({ link: event.target.value })}
        />
        <button type="submit" className="btn btn-block col-2 ml-auto"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      </div>
    </form>
  );
}

export default HomeRightDataNo;

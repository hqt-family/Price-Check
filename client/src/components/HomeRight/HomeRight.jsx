import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset, updatePrices } from "../../features/prices/priceSlice";
import Spinner from "../Spinner";
import HomeRightData from "./HomeRightData";
import HomeRightHead from "./HomeRightHead";

function HomeRight() {
  const { prices, isError, isLoading, message } = useSelector(
    (state) => state.prices
  );
  const [formData, setFormData] = useState(prices && prices.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (prices) {
      setFormData(prices.data);
    }
  }, [prices, isError, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePrices({ id: prices.productId, data: formData }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {prices && (
        <div className="home-right">
          <HomeRightHead data={prices} />
          <form className="home-right-data" onSubmit={onSubmit}>
            <HomeRightData
              data={prices}
              formData={formData}
              setFormData={setFormData}
            />
          </form>
        </div>
      )}
    </>
  );
}

export default HomeRight;

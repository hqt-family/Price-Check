import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import HomeRightDataNo from "./HomeRightDataNo";
import HomeRightDataYes from "./HomeRightDataYes";

function HomeRightData() {
  const { prices, isLoading } = useSelector((state) => state.prices);
  if(isLoading){
    return <Spinner />
  }
  return (
    <div className="home-right-data">
      {prices &&
        prices.data &&
        prices.data.map((price, index) =>
          price.link ? (
            <HomeRightDataYes
              key={index}
              brand={price.brand}
              price={price.price}
              link={price.link}
            />
          ) : (
            <HomeRightDataNo
              key={index}
              stt={index}
              id={prices && prices.productId}
            />
          )
        )}
    </div>
  );
}

export default HomeRightData;

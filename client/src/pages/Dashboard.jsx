import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchForm from "../components/Search/SearchForm";

import { getProducts } from "../features/products/productSlice";
import SearchData from "../components/Search/SearchData";

import { Space } from "antd";
import Spinner from "../components/Spinner";

import PriceHead from "../components/Price/PriceHead";
import PriceData from "../components/Price/PriceData";
import { resetPrice } from "../features/prices/priceSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [valueSearch, setValueSearch] = useState("");

  const { products, isLoadingProduct, isErrorProduct, messageProduct } =
    useSelector((state) => state.products);
  const { prices, isLoadingPrice, isErrorPrice, messagePrice } = useSelector(
    (state) => state.prices
  );

  useEffect(() => {
    if (isErrorPrice) {
      toast.error(messagePrice);
    }

    const timeOutId = setTimeout(() => {
      if (isErrorProduct) {
        toast.error(messageProduct);
      }
      if (valueSearch !== "") {
        dispatch(getProducts({ keywords: valueSearch }));
        dispatch(resetPrice());
      }
    }, 750);
    return () => clearTimeout(timeOutId);
  }, [
    isErrorPrice,
    messagePrice,
    isErrorProduct,
    messageProduct,
    navigate,
    dispatch,
    valueSearch,
  ]);

  if (isLoadingProduct || isLoadingPrice) {
    return <Spinner />;
  }

  return (
    <Space direction="vertical" size={15} className="home-body-wrap">
      <Space direction="vertical" size={15} className="home-body-search">
        <SearchForm valueSearch={valueSearch} setValueSearch={setValueSearch} />
        <SearchData products={products} />
      </Space>
      {prices && (
        <Space direction="vertical" size={15} className="home-body-price">
          <PriceHead prices={prices} />
          <PriceData prices={prices} />
        </Space>
      )}
    </Space>
  );
}

export default Dashboard;

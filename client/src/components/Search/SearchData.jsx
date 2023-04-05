import { useDispatch } from "react-redux";
import { createPrices } from "../../features/prices/priceSlice";
import { resetProduct } from "../../features/products/productSlice";

import { Image, Space } from "antd";

function SearchData({ products }) {
  const dispatch = useDispatch();
  const onClick = (e) => {
    e.target.className = "main";
    dispatch(
      createPrices({
        id: e.target.attributes["data-id"].value,
        title: e.target.attributes["data-title"].value,
        image: e.target.attributes["data-image"].value,
        url: `https://apshop.vn/products/${e.target.attributes["data-handle"].value}`,
      })
    );
    dispatch(resetProduct());
  };
  const productItem =
    products &&
    products.length > 0 &&
    products.map((product, key) => (
      <Space
        key={key}
        size={[15, 15]}
        className="d-flex home-body-search-data-item"
      >
        <Image
          width={50}
          height={50}
          src={product.images ? product.images[0].src : "/no-image.jpg"}
        />
        <button
          className="titleButton"
          data-id={product.id}
          data-title={product.title}
          data-image={product.images ? product.images[0].src : "/no-image.jpg"}
          data-handle={product.handle}
          onClick={(e) => onClick(e)}
        >
          {product.title}
        </button>
      </Space>
    ));
  return (
    <Space className="home-body-search-data" size={0} direction="vertical">
      {productItem}
    </Space>
  );
}

export default SearchData;

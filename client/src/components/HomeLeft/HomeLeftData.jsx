import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPrices } from "../../features/prices/priceSlice";
import Spinner from "../Spinner";

function HomeLeftData() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const onClick = (e) => {
    const data = {
      id: e.target.attributes["data-id"].value,
      title: e.target.attributes["data-title"].value,
      image: e.target.attributes["data-image"].value,
      price: e.target.attributes["data-price"].value,
      url: e.target.attributes["data-url"].value,
    };
    dispatch(createPrices(data));
  };
  if (isError) {
    toast.error(message);
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="home-left-data">
      <ul>
        {products ? (
          products.length > 0 ? (
            products.map((product) => (
              <li key={product.id}>
                <img
                  src={product.images ? product.images[0].src : "/no-image.jpg"}
                  alt={product.title}
                />
                <h3>{product.title}</h3>
                <button
                  type="button"
                  data-id={product.id}
                  data-title={product.title}
                  data-image={
                    product.images ? product.images[0].src : "/no-image.jpg"
                  }
                  data-price={product.variants[0].price}
                  data-url={"https://apshop.vn/products/" + product.handle}
                  onClick={onClick}
                >
                  <i className="fa fa-check"></i> Kiểm tra
                </button>
              </li>
            ))
          ) : (
            <li>Không tìm thấy sản phẩm phù hợp</li>
          )
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

export default HomeLeftData;

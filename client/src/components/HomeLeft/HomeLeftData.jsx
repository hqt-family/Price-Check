import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPrices } from "../../features/prices/priceSlice";
import { getAll, reset } from "../../features/products/productSlice";
import Spinner from "../Spinner";

function HomeLeftData() {
  const [pagination, setPagination] = useState(1);

  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getAll({ limit: 7, page: pagination }));
    dispatch(reset());
  }, [isError, message, dispatch, pagination]);

  const pagePrevious = () => {
    if (pagination <= 1) return false;
    const currentPage = pagination - 1;
    setPagination(currentPage);
  };

  const pageNext = () => {
    const currentPage = pagination + 1;
    setPagination(currentPage);
  };

  const onClick = (e) => {
    const data = {
      id: e.target.attributes["data-id"].value,
      title: e.target.attributes["data-title"].value,
      image: e.target.attributes["data-image"].value,
      price: e.target.attributes["data-price"].value,
    };
    dispatch(createPrices(data));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="home-left-data">
      <ul>
        {products ? (
          products.map((product) => (
            <li key={product.id}>
              <img
                src={product.images ? product.images[0].src : "/no-image.jpg"}
                alt={product.title}
              />
              <a href={product.url}>{product.title}</a>
              <button
                type="button"
                data-id={product.id}
                data-title={product.title}
                data-image={
                  product.images ? product.images[0].src : "/no-image.jpg"
                }
                data-price={product.variants[0].price}
                onClick={onClick}
              >
                <i className="fa fa-check"></i> Kiểm tra
              </button>
            </li>
          ))
        ) : (
          <li>Không tìm thấy sản phẩm phù hợp với ID được chọn</li>
        )}
      </ul>
      <div className="home-left-paginate">
        <button
          type="button"
          id="home-left-paginate-previous"
          onClick={pagePrevious}
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        <button type="button" id="home-left-paginate-next" onClick={pageNext}>
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default HomeLeftData;

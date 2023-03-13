import { useDispatch } from "react-redux";
import { createPrices } from "../../features/prices/priceSlice";

import { CheckOutlined } from "@ant-design/icons";
import { Row, Col, Image, Typography, Button } from "antd";

const { Title } = Typography;

function SearchData({ products }) {
  const product = (products && products.length > 0 && products[0]) || null;
  const dispatch = useDispatch();
  const onClick = () => {
    const data = {
      id: product.id,
      price: product.variants[0].price,
      url: `https://apshop.vn/products/${product.handle}`,
    };
    dispatch(createPrices(data));
  };
  const productItem = product && (
    <Row gutter={15}>
      <Col xs={{ span: 7 }} sm={{ span: 1 }}>
        <Image src={product.images[0].src || "/no-image.jpg"} />
      </Col>
      <Col xs={{ span: 17 }} sm={{ span: 20 }}>
        <Title level={5}>{product.title}</Title>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 3 }} align="end">
        <Button onClick={onClick}>
          <CheckOutlined /> Kiểm tra
        </Button>
      </Col>
    </Row>
  );
  return productItem;
}

export default SearchData;

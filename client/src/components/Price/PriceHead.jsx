import { Row, Col, Image, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import { moneyVND } from "../../helper/Helper";

const { Text, Title } = Typography;

function PriceHead({ prices }) {
  const priceHeadInfo = prices && (
    <Space className="d-flex" size={30} align="start">
      <Image
        width={100}
        height={100}
        src={prices.productImage || "/no-image.jpg"}
      ></Image>
      <Title level={5} style={{ margin: 0 }}>
        {prices.productTitle || ""}
      </Title>
    </Space>
  );

  const priceHeadMain = prices && (
    <Space direction="vertical" size={15}>
      <Link to={prices.productUrl || "/"} target="_blank">
        <Image preview={false} height={50} src="/brands/ap-logo.png" />
      </Link>
      <Text type="danger" strong>
        {prices.productPrice && moneyVND(prices.productPrice)}
      </Text>
    </Space>
  );

  const priceHeadVendor =
    prices &&
    prices.data &&
    prices.data.map(
      (value, index) =>
        value &&
        value.important && (
          <Space direction="vertical" size={15} key={index}>
            <Link to={value.link || "/"} target="_blank">
              <Image preview={false} height={50} src={value.important || ""} />
            </Link>
            <Text type="danger" strong>
              {value.price && moneyVND(value.price)}
            </Text>
          </Space>
        )
    );

  return (
    <Row gutter={15} className="home-body-price-head">
      <Col span={24}>{priceHeadInfo}</Col>
      <Col span={12} className="home-body-price-head-main">
        {priceHeadMain}
      </Col>
      <Col span={12} className="home-body-price-head-vendor">
        {priceHeadVendor}
      </Col>
    </Row>
  );
}

export default PriceHead;

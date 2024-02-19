import { Col, Row, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { moneyUSD, moneyVND } from "../../helper/Helper";

const { Text } = Typography;

function PriceItem({ stt, price, onRemove }) {
  const authExits = localStorage.getItem("user");

  const currentPrice =
    price.price != null
      ? !String(price.price).includes("$")
        ? moneyVND(price.price)
        : moneyUSD(price.price)
      : "Không tìm được";

  const PriceItemDom = price && (
    <Row gutter={15} style={{ width: "100%" }}>
      <Col xs={{ span: 13 }} sm={{ span: 16 }} align="start">
        <Link to={price.link || "/"} target="_blank">
          <Text
            className="oneLine"
            strong
            type={price.important ? "danger" : "success"}
          >
            {price.brand ? String(price.brand).toUpperCase() : price.link}
          </Text>
        </Link>
      </Col>
      <Col xs={{ span: 8 }} sm={{ span: 6 }} align="end">
        {price.price === 9999999999 ? "Liên hệ" : currentPrice}
      </Col>
      <Col xs={{ span: 3 }} sm={{ span: 2 }} align="end">
        {authExits && JSON.parse(authExits).permission !== "member" && (
          <Button shape="circle" onClick={onRemove} size="small">
            <span stt={stt}>X</span>
          </Button>
        )}
      </Col>
    </Row>
  );

  return PriceItemDom;
}

export default PriceItem;

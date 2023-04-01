import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Space, Typography, Form } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePrices } from "../../features/prices/priceSlice";
import { comparePrice } from "../../helper/Helper";
import PriceItem from "./PriceItem";

const { Text } = Typography;

function PriceData({ prices }) {
  const dispatch = useDispatch();

  const authExits = localStorage.getItem("user");
  const [formData, setFormData] = useState(prices && prices.data);

  const onFinish = (values) => {
    let newFormData = [...formData];
    for (const key in values) {
      if (values[key]) {
        newFormData[key] = {
          link: values[key],
        };
      }
    }
    dispatch(updatePrices({ id: prices.productId, data: newFormData }));
  };

  const onRemove = (e) => {
    const stt = e.target.attributes.stt.nodeValue;
    let newFormData = [...formData];
    newFormData[stt] = {
      link: null,
    };
    setFormData(newFormData);
  };
  const priceSortDom = prices && prices.data && (
    <Row>
      <Col xs={{ span: 16 }} sm={{ span: 18 }}>
        {!String(prices.data[0].price).includes("$") && (
          <Space>
            Chênh lệch so với giá nhỏ nhất:
            <Text strong className="ml-1">
              {prices.data[0].price
                ? comparePrice(prices.productPrice, prices.data[0].price)
                : "Chưa có"}
            </Text>
          </Space>
        )}
      </Col>
      {authExits && JSON.parse(authExits).permission !== "member" && (
        <Col xs={{ span: 8 }} sm={{ span: 6 }} align="end">
          <Button type="primary" htmlType="submit">
            <CloudUploadOutlined /> Cập nhật
          </Button>
        </Col>
      )}
    </Row>
  );

  const priceDataDom =
    prices &&
    formData &&
    formData.length > 0 &&
    formData.map((data, index) =>
      data && data.link ? (
        <Col xs={{ span: 24 }} sm={{ span: 8 }} key={index}>
          <PriceItem stt={index} price={data} onRemove={onRemove} />
        </Col>
      ) : (
        authExits &&
        JSON.parse(authExits).permission !== "member" && (
          <Col xs={{ span: 24 }} sm={{ span: 8 }} key={index}>
            <Form.Item name={index} noStyle>
              <Input />
            </Form.Item>
          </Col>
        )
      )
    );

  return (
    <Form onFinish={onFinish}>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {priceSortDom}
        <Row gutter={[15, 15]}>{priceDataDom}</Row>
      </Space>
    </Form>
  );
}

export default PriceData;

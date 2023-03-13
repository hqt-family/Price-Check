import { Button, Input, Image, Typography, Space, Form } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const { Text } = Typography;

function Login() {
  const dispatch = useDispatch();
  const onFinish = (value) => {
    dispatch(login(value));
  };

  return (
    <Space className="pageLogin" direction="vertical" align="center" size={15}>
      <Space direction="vertical" align="center" size={15}>
        <Image preview={false} src="/logo.png" />
        <Text type="danger">
          * Bạn đang yêu cầu truy cập vào trình kiểm tra giá sản phẩm. Vui lòng
          nhập địa chỉ name và mật khẩu để xác thực
        </Text>
      </Space>

      <Space direction="vertical" align="center" size={15}>
        <Form onFinish={onFinish}>
          <Form.Item noStyle name="name">
            <Input addonBefore="Tài khoản" style={{ marginBottom: "10px" }} />
          </Form.Item>
          <Form.Item noStyle name="password">
            <Input
              addonBefore="Mật khẩu"
              type="password"
              style={{ marginBottom: "10px" }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form>
      </Space>
    </Space>
  );
}

export default Login;

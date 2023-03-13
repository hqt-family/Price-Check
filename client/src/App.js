import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";

import { Layout, Image, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/auth/authSlice";
import { useEffect } from "react";
const { Header, Content } = Layout;

function App() {
  const dispatch = useDispatch();
  const { user, isErrorUser, isSuccessUser, messageUser } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isErrorUser) {
      toast.error(messageUser);
    }
  }, [user, isErrorUser, isSuccessUser, messageUser]);

  return (
    <Router>
      <Layout className="home">
        {user && (
          <Header className="home-head">
            <Link to="/">
              <Image preview={false} src="/logo.png" />
            </Link>
            <Space mode="horizontal" theme="dark" align="end">
              {user.permission === "master" && (
                <Button type="text" danger>
                  <Link to="/users">Quản trị tài khoản</Link>
                </Button>
              )}
              <Button type="text" danger onClick={(e) => dispatch(logout())}>
                Đăng xuất
              </Button>
            </Space>
          </Header>
        )}
        <Content className="home-body">
          <Routes>
            <Route path="*" element={<Navigate to="/" replace={true} />} />
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route path="/users" element={<Users user={user} />} />
          </Routes>
        </Content>
      </Layout>
      <ToastContainer />
    </Router>
  );
}

export default App;

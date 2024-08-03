import React from "react";
import { Layout, Menu, theme, Breadcrumb, Button } from "antd";
import { useNavigate } from "react-router-dom";
import CartButton from "../../components/CartButton";

const { Header, Content, Footer } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="text"
          shape="round"
          style={{ color: "lightgray" }}
          onClick={() => {
            navigate("/auth");
          }}
        >
          Login
        </Button>
        <CartButton />
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Welcome</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1>Welcome to the Home Page</h1>
          <p>
            This is the home page content. You can add more information here.
          </p>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;

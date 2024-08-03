import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Button,
  List,
  Avatar,
  message,
  Layout,
  Menu,
  Breadcrumb,
} from "antd";
import {
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import {
  removeFromCart,
  updateQuantity,
} from "../../../redux/actions/cartActions";
import CartButton from "../../../components/CartButton";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      dispatch(updateQuantity(id, newQuantity));
    } else {
      dispatch(removeFromCart(id));
      message.success("Item removed from cart");
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        return total + item.product.sale_price * item.quantity;
      }, 0)
      .toFixed(2);
  };

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
          <Breadcrumb.Item>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <div className="p-4 max-w-2xl mx-auto">
          <Card
            title="Your Cart"
            className="shadow-lg"
          >
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <div className="flex items-center space-x-2">
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() => handleQuantityChange(item.id, -1)}
                      />
                      <span>{item.quantity}</span>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleQuantityChange(item.id, 1)}
                      />
                    </div>,
                    <Button
                      type="link"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>,
                    <div className="text-right">
                      <div className="line-through text-gray-500">
                        ${item.product.original_price.toFixed(2)}
                      </div>
                      <div className="text-gray-600">
                        ${item.product.sale_price.toFixed(2)}
                      </div>
                    </div>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.product.product_images[0]} />}
                    title={
                      <Link to={`/product/${item.id}`}>
                        {item.product.product_name}
                      </Link>
                    }
                    description={
                      <div className="line-clamp-2">
                        {item.product.description}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-semibold">
                Total: ${calculateTotal()}
              </span>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
              >
                Checkout
              </Button>
            </div>
          </Card>
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

export default Cart;

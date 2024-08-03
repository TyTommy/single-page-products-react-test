import React from "react";
import { useSelector } from "react-redux";
import { Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Badge
      count={itemCount}
      offset={[-5, 5]}
      showZero
    >
      <Button
        type="text"
        shape="round"
        icon={<ShoppingCartOutlined />}
        style={{ color: "lightgray" }}
        onClick={() => navigate("/cart")}
      >
        Cart
      </Button>
    </Badge>
  );
};

export default CartButton;

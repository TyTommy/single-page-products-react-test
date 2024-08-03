import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CartButton from "../../components/CartButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/actions/cartActions";

const { Header, Content, Footer } = Layout;

const Product = () => {
  const { productId } = useParams();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const cartItem = useMemo(
    () => cartItems.find((item) => item.id === productId),
    [cartItems, productId]
  );

  const [activeImg, setActiveImg] = useState(0);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!productId) {
      navigate("/");
    }

    axios
      .get(`http://localhost:8000/product/single-product/${productId}`)
      .then((res) => res.data)
      .then(({ payload }) => {
        setProduct(payload);
        setActiveImg(payload.product_images[0]);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching data");
      });
  }, [productId, navigate]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity(id, newQuantity));
    } else {
      dispatch(handleRemoveFromCart(id));
      message.success("Item removed from cart");
    }
  };

  useEffect(() => {
    if (cartItem) {
      handleQuantityChange(productId, quantity);
    }
  }, [quantity]);

  const handleAddToCart = () =>
    dispatch(addToCart({ id: productId, quantity: quantity, product }));
  const handleRemoveFromCart = () => dispatch(removeFromCart(productId));
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 0 && setQuantity(quantity - 1);

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
          <Breadcrumb.Item>Product</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "73vh",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex-1 md:mr-[-200px]">
              <img
                src={activeImg}
                alt="shoes"
                className="max-w-[500px] rounded-md max-h-[400px]"
              />
              <div className="flex flex-row gap-20 h-16 mt-2">
                {product.product_images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`shoe-${index}`}
                    className={`w-16 h-16 rounded-md cursor-pointer ${
                      activeImg === img ? "border-2 border-blue-500" : ""
                    }`}
                    onClick={() => setActiveImg(img)}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 md:ml-2 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold">{product.product_name}</h1>
              <p className="text-lg mt-4">{product.description}</p>
              <div className="mt-4">
                {cartItem ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleRemoveFromCart}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              <div className="mt-4 flex items-center">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
                  onClick={decrement}
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2"
                  onClick={increment}
                >
                  +
                </button>
              </div>
            </div>
          </div>
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

export default Product;

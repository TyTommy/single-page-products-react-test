import axios from "axios"; // axios import qiling
import React, { useEffect, useState } from "react";
import { Table, Alert } from "antd";
import { Link } from "react-router-dom";

const MostPopularProduct = ({}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/most-popular`)
      .then((res) => res.data)
      .then(({ payload }) => {
        setData(payload);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching data");
      });
  }, []);

  const columns = [
    {
      title: "Index",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Image",
      key: "image",
      width: 50,
      render: (product) => {
        return (
          <div className="flex align-items-center">
            <img
              className="w-[50px] h-[50px] object-cover"
              src={product.product_images[0]}
            />
          </div>
        );
      },
    },
    {
      title: "Title",
      key: "product_name",
      render: (product) => (
        <Link to={`/product/${product._id}`}>{product.product_name}</Link>
      ),
    },
    {
      title: "Price",
      key: "original_price",
      render: (product) => `$${product.original_price}`,
    },
    {
      title: "Discount Price",
      key: "sale_price",
      render: (product) => `$${product.sale_price}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
  ];

  return (
    <div>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
        />
      )}

      {data && data.length > 0 ? (
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <div className="text-center">No products found</div>
      )}
    </div>
  );
};

export default MostPopularProduct;

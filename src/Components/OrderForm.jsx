import React, { useState } from "react";

const OrderForm = () => {
  const [productAQuantity, setProductAQuantity] = useState(0);
  const [productBQuantity, setProductBQuantity] = useState(0);
  const [ShippingAddress, setShippingAddress] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productQuantity = {
      productAQuantity,
      productBQuantity,
    };

    const order = {
      productQuantity,
      ShippingAddress,
    };
    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        if (response.headers.get("Content-Type").includes("application/json")) {
          const errorData = await response.json(); // Get error data from response
          throw new Error(`Missing field: ${errorData.field}`); // Display missing field name
        } else {
          const errorText = await response.text(); // Get error text from response
          throw new Error(`${errorText}`); // Display error text
        }
      }

      const data = await response.json();

      setOrderStatus(`Order submitted with order id: ${data.order.orderId}`);
    } catch (error) {
      setOrderStatus(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Product A Quantity:
          <input
            type="number"
            value={productAQuantity}
            onChange={(e) => setProductAQuantity(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Product B Quantity:
          <input
            type="number"
            value={productBQuantity}
            onChange={(e) => setProductBQuantity(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Shipping Address:
          <input
            type="text"
            value={ShippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit Order</button>
      <div>{orderStatus}</div>
    </form>
  );
};

export default OrderForm;

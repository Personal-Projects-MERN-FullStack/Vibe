import React from "react";

const OrdersCard = ({ orders }) => {
  const dateString = orders.orderdate;
const date = new Date(dateString);

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Zero-pad the month
const day = String(date.getDate()).padStart(2, '0'); // Zero-pad the day

const formattedDate = `${day}-${month}-${year}`;
  return (
    <div className="flex-1 max-w-md bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
      <div>
        <img
          src="https://www.shutterstock.com/image-vector/shopping-cart-check-mark-icon-600w-1708233319.jpg"
          alt="Product"
          className="w-16 h-16 rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">Order ID : {orders.orderid}</h3>
        <p className="text-gray-600">Purchase Date: {formattedDate}</p>
        <p className="text-gray-600">Bill: ₹ {orders.totalbill}</p>
        <p className="text-gray-600">Payment Status: {orders.paymentstatus}</p>
      </div>
    </div>
  );
};

export default OrdersCard;

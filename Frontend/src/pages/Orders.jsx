import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadorderData = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.post(
        backendURL + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrderData(response.data.orders);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadorderData();
  }, [token]);
  return (
    <div className="border-t pt-16">
      {/* Title */}
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>

      {/* Orders */}
      <div className="">
        {orderData.map((order, orderIndex) => {
          return (
            <div key={orderIndex} className="mb-8 border-b pb-4">
              {/* Order Header */}
              <div className="mb-4 text-lg font-semibold text-gray-800">
                Order ID: {order?._id || "N/A"}
              </div>

              {/* Items in the Order */}
              {order.items.map((item, itemIndex) => {
                const itemInfo = item?.itemInfo || {};
                return (
                  <div
                    key={itemIndex}
                    className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    {/* Left Section */}
                    <div className="flex items-start gap-6 text-sm">
                      {/* Item Image */}
                      <img
                        className="w-16 sm:w-20"
                        src={itemInfo.image[0]} // Display the first image from the item's image array
                        alt={itemInfo.name || "Product Image"}
                      />

                      {/* Item Details */}
                      <div>
                        {/* Item Name */}
                        <p className="sm:text-base font-medium">
                          {itemInfo.name || "Item Name"}
                        </p>

                        {/* Price and Quantity */}
                        <div className="flex items-center gap-3 mt-3 text-base text-gray-600">
                          <p className="text-lg">{`₹${itemInfo.price || 0}`}</p>
                          <p>Quantity: {item?.quantity || 1}</p>
                        </div>

                        {/* Category */}
                        <p className="text-sm mt-2">
                          Category:{" "}
                          <span className="text-gray-500">
                            {itemInfo.category || "N/A"}
                          </span>
                        </p>

                        {/* {payment method} */}
                        <p className="text-sm mt-2 ">
                          Payment Mode:{" "}
                          <span className="text-gray-400">
                            {order?.paymentMethod || "N/A"}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="md:w-1/2 flex justify-between items-center ">
                      {/* Order Status */}
                      <div className="flex items-center gap-2 ">
                        <span class="relative flex size-3">
                          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-100"></span>
                          <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        </span>
                        <p className="text-sm md:text-base">
                          {order?.status || "Order Status"}
                        </p>
                      </div>

                      {/* Track Order Button */}
                      <button
                        onClick={loadorderData}
                        className="border px-3 py-1 text-sm rounded-sm"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Total Amount */}
              <div className="text-right mt-4">
                <p className="text-lg font-semibold">
                  Total: ₹{order?.amount || 0}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;

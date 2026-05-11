import { useEffect, useState } from "react";
import { getOrders } from "../utils/orderStorage";
import { useCart } from "../context/CartContext";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    if (status === "Preparing") return "bg-orange-100 text-orange-600";
    if (status === "Delivered") return "bg-gray-200 text-gray-600";
    return "bg-gray-100 text-gray-500";
  };

  const handleReorder = (items) => {
    items.forEach((item) => addToCart(item));
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] px-6 py-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review your past orders and reorder your favorites.
          </p>
        </div>

        <div className="flex justify-end gap-3 mb-6 text-sm">
          <button className="px-4 py-1.5 rounded-full border bg-white shadow-sm hover:bg-gray-50">
            All Orders
          </button>
          <button className="px-4 py-1.5 rounded-full border bg-white shadow-sm hover:bg-gray-50">
            Last 30 Days
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {orders.length === 0 ? (
            <div className="text-gray-400 text-center py-20 col-span-2">
              No orders yet
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="bg-gray-100 p-3 rounded-xl flex gap-3 items-center mb-4">
                  {order.items?.[0]?.image && (
                    <img
                      src={order.items[0].image}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}

                  <div className="text-sm text-gray-700">
                    <p className="font-medium">
                      {order.items?.[0]?.qty}× {order.items?.[0]?.name}
                    </p>

                    {order.items?.slice(1).map((item, i) => (
                      <p key={i} className="text-xs text-gray-500">
                        {item.qty}× {item.name}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">TOTAL</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{order.total?.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-100 transition">
                      Details
                    </button>

                    <button
                      onClick={() => handleReorder(order.items)}
                      className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                      Re-order
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;

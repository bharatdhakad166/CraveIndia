import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../data/menuData";
import { useCart } from "../context/CartContext";
import { saveOrder } from "../utils/orderStorage";

const DELIVERY_FEE = 5.0;
const TAX_RATE = 0.094;

export default function CartPage() {
  const { cartItems, changeQty, removeItem } = useCart();
  const navigate = useNavigate();

  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  
  const handleApplyPromo = () => {
    if (promo.trim()) setPromoApplied(true);
  };

  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const taxes = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + DELIVERY_FEE + taxes;

  
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    const newOrder = {
      orderId: "UB-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleString(),
      status: "Preparing",
      items: cartItems.map((item) => ({ ...item })),
      total: total,
    };

    try {
      await saveOrder(newOrder);

      
      navigate("/OrderPage");

      setTimeout(() => {
        cartItems.forEach((item) => removeItem(item.id));
      }, 100);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] px-5 py-10 font-serif">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Your Cart
        </h1>

        <button className="mt-1 text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1 font-sans bg-transparent border-none cursor-pointer p-0">
          <Link to="/MenuPage">← Continue Shopping</Link>
        </button>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
          
          
          <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-10 text-gray-400 font-sans text-sm">
                🛒 Your cart is empty. Add some delicious items!
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#f0ece6] bg-[#fdfcfb]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[72px] h-[72px] rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-bold text-[15px] text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 font-sans">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 mt-2.5">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="w-7 h-7 rounded-lg border text-gray-500 hover:text-orange-500 hover:border-orange-400"
                      >
                        -
                      </button>

                      <span className="text-sm font-semibold w-5 text-center">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="w-7 h-7 rounded-lg border text-gray-500 hover:text-orange-500 hover:border-orange-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full">
                    <span className="text-base font-bold text-orange-500">
                      ₹{item.price * item.qty}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-400 text-lg"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>


          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm text-gray-500 mb-2.5">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(1)}</span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-sm text-green-600 mb-2.5">
                <span>Promo (10% off)</span>
                <span>−₹{discount.toFixed(1)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm text-gray-500 mb-2.5">
              <span>Delivery Fee</span>
              <span>₹{DELIVERY_FEE}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mb-2.5">
              <span>Taxes (Including all)</span>
              <span>₹{taxes.toFixed(1)}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center mb-5">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-extrabold text-orange-500">
                ₹{total.toFixed(1)}
              </span>
            </div>


            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Promo Code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                disabled={promoApplied}
                className="flex-1 px-4 py-2.5 border rounded-xl text-sm bg-[#fafaf9] focus:border-orange-300 outline-none"
              />

              <button
                onClick={handleApplyPromo}
                disabled={promoApplied}
                className="px-4 py-2.5 border border-orange-500 text-orange-500 rounded-xl text-sm font-semibold hover:bg-orange-50"
              >
                {promoApplied ? "✓" : "Apply"}
              </button>
            </div>


            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
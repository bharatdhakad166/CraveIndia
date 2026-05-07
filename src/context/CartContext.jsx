import { createContext, useContext, useState } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { showToast } = useToast();

  const addToCart = (item) => {
  setCartItems((prev) => {
    const existing = prev.find((i) => i.id === item.id);

    if (existing) {
      return prev.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      );
    }

    return [...prev, { ...item, qty: 1 }];
  });

  
  showToast("Item added to cart", "success");
};

  const changeQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, changeQty, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
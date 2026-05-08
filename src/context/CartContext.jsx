import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider ({children}) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if(existing) {
        return prev.map((item) => item.id === product.id ? {...item,qty:item.qty + 1} : item);
      }

      return [...prev, {...product, qty:1}]
    });
  }

  const removeFromCart = (id) => {
     setCart((prev) =>
        prev
          .map((item) => item.id === id ? { ...item, qty: item.qty - 1 } : item)
          .filter((item) => item.qty > 0)
      );
  }

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}
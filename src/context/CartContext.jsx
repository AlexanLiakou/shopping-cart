import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider ({children}) {
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if(existing) {
        return prev.map((item) => item.id === product.id ? {...item,qty:item.qty +1} : item);
      }

      return [...prev, {...product, qty:1}]
    });
  }

  return (
    <CartContext.Provider value={{cart, addToCart}}>
      {children}
    </CartContext.Provider>
  );
}
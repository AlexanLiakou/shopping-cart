import { useState, useEffect, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../hooks/useCart";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const {cart, removeFromCart, clearCart} = useCart();
  const itemCount = cart.reduce((acc,item) => acc + item.qty, 0);
  const total = cart.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2);
  const dropdownRef = useRef(null);

  useEffect(() => {
    //Closes cart dropdown if the user clicks outside it
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);;

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">ShopMate</h1>
      <div className="relative" ref={dropdownRef}>
        <button className="cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
          <FaShoppingCart  className='text-2xl text-gray-700'/>
          {
            itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )
          }
          {
            showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2">Cart Items</h2>
                    {
                      cart.length === 0 ? (
                        <p className="text-gray-500 text-sm">Your cart is empty</p>
                      ): (
                        <>
                          <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                            {
                              cart.map((item) => (
                                <li key={item.id} className="flex justify-between items-center py-2">
                                  <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-left text-gray-300"> {item.qty} x $ {item.price}</p>
                                  </div>
                                  <button className=" cursor-pointer text-sm text-red-500 hover:underline" onClick={(e) =>{ e.stopPropagation(); removeFromCart(item.id)} }>Remove</button>
                                </li>
                              ))
                            }
                          </ul>
                          <div className="mt-4 mb-3 flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>{total}</span>
                          </div>
                          <button className="cursor-pointer w-full bg-red-500 text-white py-1 rounded transition hover:bg-red-600" onClick={ (e) => {e.stopPropagation(); clearCart(); }}>Clear Cart</button>
                        </>
                      )
                    }
                </div>
              </div>
            )
          }
        </button>
      </div>
    </header>
  );
}

  export default Header;
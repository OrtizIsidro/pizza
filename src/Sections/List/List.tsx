import React, { useRef, useState } from "react";
import "./styles.css";
import ActionButtons from "./ActionButtons";
import Data from "./menuData.json";
import Menu from "./Menu";

const List = () => {
  const [cart, setCart] = useState([]);

  const cleanQuantityFunctionsRef = useRef([]);

  const updateQuantity = (item) =>
    setCart((prev) => {
      const index = prev.findIndex((prevItem) => prevItem.id === item.id);
      if (index == -1) return [...prev, item];
      const newState = [...prev];
      newState[index] = item;
      return newState;
    });

  const cleanCart = () => {
    if (cart.length < 1) return;
    cleanQuantityFunctionsRef.current.forEach((cleanQuantity) =>
      cleanQuantity()
    );
    setCart([]);
  };

  const sendOrder = () => {};

  const total_price = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const showButtons = cart.length > 0;

  return (
    <>
      {Data.map(({ category, items }, index) => (
        <Menu
          category={category}
          items={items}
          key={index}
          updateQuantity={updateQuantity}
          cleanQuantityFunctionRef={cleanQuantityFunctionsRef}
        />
      ))}

      {showButtons && (
        <ActionButtons
          total_price={total_price}
          cleanCart={cleanCart}
          sendOrder={sendOrder}
        />
      )}
    </>
  );
};
export default List;

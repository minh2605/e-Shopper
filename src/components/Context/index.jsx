import React, { useState } from "react";

export const MyContext = React.createContext();

function MyProvider(props) {
  const cartCountLocal = localStorage.getItem("cartCount");
  const [cartCount, setCartCount] = useState(() => {
    return cartCountLocal || 0;
  });
  return (
    <MyContext.Provider
      value={{
        cartCount: cartCount,
        setCartCount: setCartCount,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyProvider;

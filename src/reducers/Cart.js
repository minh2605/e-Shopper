const initialState = {
  list: JSON.parse(localStorage.getItem("cart")) || {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART": {
      const newList = { ...state.list, ...action.payload };
      localStorage.setItem("cart", JSON.stringify(newList));
      localStorage.setItem("cartCount", Object.keys(newList).length);
      return {
        ...state,
        list: newList,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;

const initialState = {
  list: JSON.parse(localStorage.getItem("wishlist")) || [],
};

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WISHLIST": {
      const newList = [...state.list];
      newList.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(newList));
      // console.log("add wishlist:", state.list);
      // console.log("reducer", newList);
      return {
        ...state,
        list: newList,
      };
    }
    case "DELETE_WISHLIST": {
      const newList = state.list.filter(
        (product) => product.id !== action.payload
      );
      console.log(newList);
      localStorage.setItem("wishlist", JSON.stringify(newList));
      return {
        list: newList,
      };
    }
    default:
      return state;
  }
};

export default wishListReducer;

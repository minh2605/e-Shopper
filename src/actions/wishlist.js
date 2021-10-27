export const addNewWishList = (wishList) => {
  return {
    type: "ADD_WISHLIST",
    payload: wishList,
  };
};

export const deleteWishList = (id) => {
  return {
    type: "DELETE_WISHLIST",
    payload: id,
  };
};

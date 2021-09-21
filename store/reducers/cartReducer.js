let initialState = {
  selectedItems: {
    items: [],
    restaurantName: "",
  },
};

export default cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
      // console.log("👉", newState);
      return newState;

    default:
      return state;
  }
};

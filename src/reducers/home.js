const initialState = {
  food_items: [],
  my_orders: [],
  search_results: [],
};

export function home(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case "FETCH_PRODUCTS_SUCCESS":
      newState.food_items = action.data;
      return newState;
    case "FETCH_MYORDERS_SUCCESS":
      newState.my_orders = action.data;
      return newState;
    case "FETCH_SEARCH_DATA_SUCCESS":
      let newArr = [];
      if (action.searchString !== "" && state.food_items && state.food_items.length > 0) {
        state.food_items.forEach(item => {
          if (item.name.toLowerCase() === action.searchString) {
            newArr.push(item);
          }
        });
      }
      newState.search_results = newArr;
      return newState;

    default:
      return state;
  }
}
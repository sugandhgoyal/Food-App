import axios from 'axios';
import { api } from '../services/apiConstants';

export const loadHomePageData = () => {
  return (dispatch) => {
    let url = api.GET_ITEMS;
    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_PRODUCTS_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_PRODUCTS_ERROR",
          error,
        });
      })
  }
}

export const loadMyOrders = () => {
  return (dispatch) => {
    let url = api.MY_ORDERS;
    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MYORDERS_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_MYORDERS_ERROR",
          error,
        });
      })
  }
}

export const searchData = (searchString) => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_SEARCH_DATA_SUCCESS",
      searchString
    });
  }
}
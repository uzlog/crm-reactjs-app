import {
  FETCH_START,
  FETCH_SUCCESS,
  GET_ALL_CUSTOMERS_SUCCESS
} from "../../constants/ActionTypes";

import { USER_API } from "../../util/ApiCalling";


export const onGetCustomers = () => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const response = await USER_API.get('users');
    console.log(response.data);
    dispatch({type: FETCH_SUCCESS});

    dispatch({
      type: GET_ALL_CUSTOMERS_SUCCESS,
      payload: response.data.data
    });
  }
};

export const onAddCustomer = (user) => {

};

export const onUpdateCustomer = (id, data) => {

};

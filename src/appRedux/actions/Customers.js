import {
  FETCH_START,
  FETCH_SUCCESS,
  GET_ALL_CUSTOMERS_SUCCESS,
  LOADING,
  ON_ADD_CUSTOMER_SUCCESS
} from "../../constants/ActionTypes";

import { USER_API } from "../../util/ApiCalling";
import {logout, sleep} from "../../util/Debug";


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
  return async (dispatch) => {
    dispatch({type: LOADING});

    logout('add user: ', user);
    await sleep(1500);

    dispatch({type: ON_ADD_CUSTOMER_SUCCESS});
  }
};

export const onUpdateCustomer = (id, data) => {
  logout('update user');
};

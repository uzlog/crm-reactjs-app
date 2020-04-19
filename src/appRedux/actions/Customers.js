import {
  FETCH_START,
  FETCH_SUCCESS,
  GET_ALL_CUSTOMERS_SUCCESS,
  LOADING,
  ON_ADD_CUSTOMER_SUCCESS,
  ON_ADD_CUSTOMER_FAIL
} from "../../constants/ActionTypes";

import { USER_API, FAIL} from "../../util/ApiCalling";
import {logout, sleep} from "../../util/Debug";
import {message} from "antd";


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

    const response = await USER_API.post('users', user);

    logout(response);
    if (response.data.status === FAIL){
      message.error(response.data.data.message);
      dispatch({type: ON_ADD_CUSTOMER_FAIL});
    }
    else {
      message.success('Create customer successfully');
      dispatch({
        type: ON_ADD_CUSTOMER_SUCCESS,
        payload: user
      });
    }

  }
};

export const onUpdateCustomer = (id, data) => {
  logout('update user');
};

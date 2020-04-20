import {
  FETCH_START,
  FETCH_SUCCESS,
  GET_ALL_CUSTOMERS_SUCCESS,
  LOADING,
  ON_ADD_CUSTOMER_SUCCESS,
  ON_ADD_CUSTOMER_FAIL,
  ON_UPDATE_SELECTED_CUSTOMER, ON_CLOSE_MODAL, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAIL
} from "../../constants/ActionTypes";

import { USER_API, FAIL} from "../../util/ApiCalling";
import {logout} from "../../util/Debug";
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

    // logout('add user: ', user);
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

  return async (dispatch) => {
    logout('update user: ' + id + ' with data: ' + data);
    const response = await USER_API.put('users/' + id, data);
    if (response.data.status === FAIL){
      message.error(response.data.data.message);
      dispatch({
        type: UPDATE_CUSTOMER_FAIL
      })
    }
    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: data
    });
  }
};

export const onUpdateSelectedCustomer = (selectedCustomers) => {
  return async (dispatch) => {
    logout('action: ', selectedCustomers);
    dispatch({
      type: ON_UPDATE_SELECTED_CUSTOMER,
      payload: selectedCustomers
    });
  };
};

export const onCloseModal = () => {
  return async (dispatch) => {
    logout('close modal');
    dispatch({type: ON_CLOSE_MODAL});
  }
};


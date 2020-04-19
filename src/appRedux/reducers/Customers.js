import {
  GET_ALL_CUSTOMERS_SUCCESS,
  LOADING,
  ON_ADD_CUSTOMER_SUCCESS,
  ON_ADD_CUSTOMER_FAIL
} from "../../constants/ActionTypes";

const INIT_STATE = {
  customerList: [],
  selectedCustomers: [],
  loading: false

};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_ALL_CUSTOMERS_SUCCESS:{
      console.log(action.payload);
      return {
        ...state,
        customerList: action.payload.result
      };
    }

    case ON_ADD_CUSTOMER_SUCCESS:{

      return {
        ...state,
        loading: false,
        customerList: [...state.customerList, action.payload]
      };
    }

    case ON_ADD_CUSTOMER_FAIL:{
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
}

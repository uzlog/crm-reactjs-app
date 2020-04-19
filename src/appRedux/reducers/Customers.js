import {
  GET_ALL_CUSTOMERS_SUCCESS,
  LOADING,
  ON_ADD_CUSTOMER_SUCCESS,
  ON_ADD_CUSTOMER_FAIL
} from "../../constants/ActionTypes";
import {logout} from "../../util/Debug";

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
      let customerList = action.payload.result.map((val, index) => {
        return {key: index, ... val};
      });
      logout(customerList);
      return {
        ...state,
        customerList: customerList
      };
    }

    case ON_ADD_CUSTOMER_SUCCESS:{

      return {
        ...state,
        loading: false,
        customerList: [action.payload, ...state.customerList]
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

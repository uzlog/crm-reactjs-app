import {
  GET_ALL_CUSTOMERS_SUCCESS,
  LOADING,
  ON_ADD_CUSTOMER_SUCCESS,
  ON_ADD_CUSTOMER_FAIL,
  ON_UPDATE_SELECTED_CUSTOMER,
  ON_CLOSE_MODAL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DISABLE_CUSTOMER_SUCCESS,
  ON_CHOOSE_CUSTOMER
} from "../../constants/ActionTypes";
import {logout} from "../../util/Debug";

const INIT_STATE = {
  customerList: [],
  selectedCustomers: [],
  loading: false,
  currentPage: 1,
  pageSize: 10,
  total: 0,      // total customers in the system, not total number of customers in the above customerList
  edit: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_ALL_CUSTOMERS_SUCCESS: {
      const {result, page, page_size, total_elements} = action.payload;
      let customerList = result.map((val, index) => {
        return {key: index, ...val};
      });

      return {
        ...state,
        customerList: customerList,
        currentPage: page,
        pageSize: page_size,
        total: total_elements
      };
    }

    case ON_CHOOSE_CUSTOMER: {
      return {
        ...state,
        selectedCustomers: action.payload
      }
    }

    case ON_ADD_CUSTOMER_SUCCESS: {

      return {
        ...state,
        loading: false,
        customerList: [action.payload, ...state.customerList]
      };
    }

    case ON_ADD_CUSTOMER_FAIL: {
      return {
        ...state,
        loading: false
      };
    }

    case ON_UPDATE_SELECTED_CUSTOMER: {
      return {
        ...state,
        selectedCustomers: action.payload,
        edit: true
      };
    }

    case ON_CLOSE_MODAL: {
      return {
        ...state,
        selectedCustomers: [],
        edit: false
      }
    }

    case UPDATE_CUSTOMER_SUCCESS: {
      const key = action.payload.key;
      state.customerList[key] = {...state.customerList[key], ...action.payload};
      const newCustomerList = state.customerList;

      return {
        ...state,
        customerList: newCustomerList,
        selectedCustomers: [],
        edit: false
      };
    }

    case UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        selectedCustomers: [],
        edit: false
      };
    }

    case DISABLE_CUSTOMER_SUCCESS: {
      action.payload.map((key) => {
        state.customerList[key] = {...state.customerList[key], 'active': false};
        return key;
      });
      logout(state.customerList);
      return {
        ...state,
        customerList: state.customerList,
        selectedCustomers: []
      };
    }

    default:
      return state;
  }
}

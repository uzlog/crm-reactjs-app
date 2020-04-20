import {
  GET_ALL_CUSTOMERS_SUCCESS,
  LOADING,
  ON_ADD_CUSTOMER_SUCCESS,
  ON_ADD_CUSTOMER_FAIL,
  ON_UPDATE_SELECTED_CUSTOMER
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

    case GET_ALL_CUSTOMERS_SUCCESS:{
      console.log(action.payload);
      const {result, page, page_size, total_elements} = action.payload;
      let customerList = result.map((val, index) => {
        return {key: index, ...val};
      });
      logout(customerList);
      return {
        ...state,
        customerList: customerList,
        currentPage: page,
        pageSize: page_size,
        total: total_elements
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

    case ON_UPDATE_SELECTED_CUSTOMER:{
      return {
        ...state,
        selectedCustomers: action.payload,
        edit: true
      };
    }

    default:
      return state;
  }
}

import {
  GET_ALL_CUSTOMERS_SUCCESS
} from "../../constants/ActionTypes";

const INIT_STATE = {
  customerList: [],
  selectedCustomers: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_ALL_CUSTOMERS_SUCCESS:{
      console.log(action.payload);
      return {
        ...state,
        customerList: action.payload.result
      };
    }

    default:
      return state;
  }
}

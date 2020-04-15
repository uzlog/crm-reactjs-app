import React, { Component } from "react";
// import { Table, Dropdown, Menu, Button } from "antd";
import { onGetCustomers } from "../../../appRedux/actions";
import {connect} from "react-redux";

class Customers extends Component {

  constructor() {
    super();
    this.state = {
      noContentFoundMessage: 'No customer found',
      alertMessage: '',
      showMessage: false,
      selectedSectionId: 1,
      drawerState: false,
      user: {
        name: 'Vuong LV',
        email: 'vuong.lv34@gmail.com',
        avatar: 'https://via.placeholder.com/150x150'
      },
      searchUser: '',
      filterOption: 'All customers',
      allCustomers: [],
      customerList: [],
      selectedCustomer: null,
      addCustomerState: false,
    }
  }

  componentDidMount() {
    this.props.onGetCustomers();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("customerList: ", nextProps.customerList);
    if (nextProps.customerList){
      this.setState({
        allCustomers: nextProps.customerList,
        customerList: nextProps.customerList
      });
    }
  }


  render() {
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = ({customers}) => {
  const {customerList, selectedCustomer} = customers;
  return {customerList, selectedCustomer};
};

export default connect(mapStateToProps, {
  onGetCustomers
})(Customers);

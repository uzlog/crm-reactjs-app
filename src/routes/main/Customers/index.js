import React, { Component } from "react";
// import { Table, Dropdown, Menu, Button } from "antd";
import { onGetCustomers } from "../../../appRedux/actions";
import {connect} from "react-redux";
import CustomerTable from "./CustomerTable";

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
      selectedCustomers: [],
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
      <CustomerTable customerList={this.props.customerList} />
    );
  }
}

const mapStateToProps = ({customers}) => {
  const {customerList, selectedCustomers} = customers;
  return {customerList, selectedCustomers};
};

export default connect(mapStateToProps, {
  onGetCustomers
})(Customers);

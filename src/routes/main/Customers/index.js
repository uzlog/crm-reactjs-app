import React, { Component } from "react";
import { Table, Dropdown, Menu, Button } from "antd";
import { USER_API } from "../../../util/ApiCalling";


class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false,
      users: [],
      filteredInfo: {},
      sortedInfo: {}
    };
  }


}

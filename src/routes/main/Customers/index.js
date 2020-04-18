import React, {Component} from "react";
import {onGetCustomers, onAddCustomer, onUpdateCustomer} from "../../../appRedux/actions";
import {connect} from "react-redux";
// import CustomerTable from "./CustomerTable";
import {Button, Card, Table} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import log from "../../../util/Log";
import AddCustomer from "./AddCustomer";

let userId = 73434;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
];


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
    if (nextProps.customerList) {
      this.setState({
        allCustomers: nextProps.customerList,
        customerList: nextProps.customerList
      });
    }
  }

  onSelectChange = (selectedCustomerKeys) => {
    log("selected customer keys: ", selectedCustomerKeys);
    this.setState({selectedCustomerKeys});
  };

  onAddCustomer = () => {
    this.setState({addCustomerState: true});
  };

  onCustomerClose = () => {
    this.setState({addCustomerState: false});
  };

  onSaveCustomer = (id, data) => {
    if (id) this.props.onUpdateCustomer(id, data);
    else this.props.onAddCustomer();
  };

  render() {
    const {customerList} = this.props;
    const {selectedCustomerKeys, addCustomerState} = this.state;
    const rowSelection = {
      selectedCustomerKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedCustomerKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({selectedCustomerKeys: newSelectedRowKeys});
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({selectedCustomerKeys: newSelectedRowKeys});
        },
      }],
      onSelection: this.onSelection,
    };

    return (
      <div>
        <Card title="Customer Table">
          <div className="table-operations">
            <Button className="ant-btn" type="primary" aria-label="add"
                    onClick={this.onAddCustomer}>
              <i className="icon icon-add gx-mr-2"/>
              <IntlMessages id="actions.add.customer"/>
            </Button>

            <Button className="ant-btn" aria-label="add"
                    onClick={this.onAddContact}>
              <i className="icon icon-edit gx-mr-2"/>
              <IntlMessages id="actions.edit"/>
            </Button>

            <Button className="ant-btn" type="danger" aria-label="add"
                    onClick={this.onAddContact}>
              <i className="icon icon-trash gx-mr-2"/>
              <IntlMessages id="actions.delete"/>
            </Button>
          </div>
          <Table className="gx-table-responsive" rowSelection={rowSelection} columns={columns}
                 dataSource={customerList}/>
        </Card>

        <AddCustomer
          open={addCustomerState}
          user={{
            'id': userId,
            'name': '',
            'email': '',
            'phone': ''
          }}
          onSaveUser={this.onSaveCustomer}
          onUserClose={this.onCustomerClose}
        />
      </div>
    );
  }
}

const mapStateToProps = ({customers}) => {
  const {customerList, selectedCustomers} = customers;
  return {customerList, selectedCustomers};
};

export default connect(mapStateToProps, {
  onGetCustomers,
  onAddCustomer,
  onUpdateCustomer
})(Customers);

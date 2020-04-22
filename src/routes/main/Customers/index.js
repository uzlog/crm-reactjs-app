import React, {Component} from "react";
import {onGetCustomers, onAddCustomer, onUpdateCustomer, onUpdateSelectedCustomer, onCloseModal, onDisableCustomer} from "../../../appRedux/actions";
import {connect} from "react-redux";
import {Button, Card, Table, message, Popconfirm} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {logout} from "../../../util/Debug";
import CustomerModal from "./CustomerModal";
import {columns} from "./TableConfig";

let userId = 73434;

class Customers extends Component {

  constructor() {
    super();
    this.state = {
      searchUser: '',
      filterOption: 'All customers',
      allCustomers: [],
      customerList: [],
      selectedCustomers: [],
      selectedCustomer: {},
      openModal: false,   // to open modal to create or update customer
    };
  }

  componentDidMount() {
    this.props.onGetCustomers(1, 10);
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

  onSelectChange = (selectedCustomers) => {
    this.setState({selectedCustomers});
  };

  onAddCustomer = () => {
    this.setState({openModal: true});
  };

  onUpdateCustomer = () => {
    let selectedCustomers = this.state.selectedCustomers;
    if (selectedCustomers.length !== 1){
      message.error('Please select one!');
    }
    else {
      this.props.onUpdateSelectedCustomer(selectedCustomers);
      this.setState({openModal: true});
    }
  };

  onCustomerClose = () => {
    logout(this.state.selectedCustomers);
    this.setState({openModal: false, selectedCustomers: []});
    this.props.onCloseModal();
    logout(this.state.selectedCustomers);
  };

  onSaveCustomer = (edit, customer) => {
    this.setState({loading: true});
    if (edit) {
      this.props.onUpdateCustomer(this.props.customerList[customer.key]._id, customer);
    }
    else {
      customer = {...customer, key: customer.key++};
      this.props.onAddCustomer(customer);
    }

    this.setState({loading: false, selectedCustomers: []});
  };

  onDeleteCustomer = () => {
    let selectedCustomers = this.state.selectedCustomers;
    if (selectedCustomers.length === 0){
      message.error('Please select at least one customer!');
    }
    else {
      this.setState({loading: true});
      this.props.onDisableCustomer(selectedCustomers, this.props.customerList);
      this.setState({loading: false, selectedCustomers: []});
    }
  };

  onPageChange = (page, pageSize) => {
    this.setState({loading: true});
    this.props.onGetCustomers(page, pageSize);
    this.setState({loading: false, selectedCustomers: []});
  };

  render() {
    const {customerList, currentPage, pageSize, total} = this.props;
    const {selectedCustomers, openModal} = this.state;
    const rowSelection = {
      selectedRowKeys: selectedCustomers,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedCustomers: [...Array(46).keys()], // 0...45
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
          this.setState({selectedCustomers: newSelectedRowKeys});
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
          this.setState({selectedCustomers: newSelectedRowKeys});
        },
      }],
      onSelection: this.onSelection
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

            <Button className="ant-btn" aria-label="update"
                    onClick={this.onUpdateCustomer}>
              <i className="icon icon-edit gx-mr-2"/>
              <IntlMessages id="actions.edit"/>
            </Button>

            <Popconfirm
              placement="top" title={<IntlMessages id="actions.delete.customer.confirm"/>}
              okText={<IntlMessages id="actions.yes"/>}
              cancelText={<IntlMessages id="actions.no"/>}
              onConfirm={this.onDeleteCustomer}
            >
              <Button className="ant-btn" type="danger" aria-label="delete">
                <i className="icon icon-trash gx-mr-2"/>
                <IntlMessages id="actions.delete"/>
              </Button>
            </Popconfirm>
          </div>
          <Table
            className="gx-table-responsive"
            loading={this.props.loading}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={customerList}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              onChange: this.onPageChange
            }}
          />
        </Card>

        <CustomerModal
          open={openModal}
          user={{
            'key': userId++,
            'name': '',
            'email': '',
            'phone': '',
            'username': ''
          }}
          onSaveUser={this.onSaveCustomer}
          onUserClose={this.onCustomerClose}
        />
      </div>
    );
  }
}

const mapStateToProps = ({customers}) => {
  const {customerList, selectedCustomers, loading, currentPage, pageSize, total} = customers;
  return {customerList, selectedCustomers, loading, currentPage, pageSize, total};
};

export default connect(mapStateToProps, {
  onGetCustomers,
  onAddCustomer,
  onUpdateCustomer,
  onUpdateSelectedCustomer,
  onCloseModal,
  onDisableCustomer
})(Customers);

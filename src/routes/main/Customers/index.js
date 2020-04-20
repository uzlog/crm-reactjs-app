import React, {Component} from "react";
import {onGetCustomers, onAddCustomer, onUpdateCustomer, onUpdateSelectedCustomer, onCloseModal} from "../../../appRedux/actions";
import {connect} from "react-redux";
// import CustomerTable from "./CustomerTable";
import {Button, Card, Table, message} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {logout} from "../../../util/Debug";
import CustomerModal from "./CustomerModal";

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
      selectedCustomer: {},
      openModal: false   // to open modal to create or update customer
    };
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

  onSelectChange = (selectedCustomers) => {
    // log("selected customer keys: ", selectedCustomerKeys);
    this.setState({selectedCustomers});
  };

  onAddCustomer = () => {
    this.setState({openModal: true});
  };

  onUpdateCustomer = () => {
    let selectedCustomers = this.state.selectedCustomers;
    if (selectedCustomers.length !== 1){
      message.error('Please select one!')
    }
    else {
      this.props.onUpdateSelectedCustomer(selectedCustomers);
      this.setState({openModal: true});
    }
  };

  onCustomerClose = () => {
    this.setState({openModal: false});
    this.props.onCloseModal();
  };

  onSaveCustomer = (edit, data) => {
    this.setState({loading: true});
    edit ? this.props.onUpdateCustomer(data): this.props.onAddCustomer(data);
    this.setState({loading: false});
  };

  render() {
    const {customerList, currentPage, pageSize, total} = this.props;
    const {selectedCustomerKeys, openModal} = this.state;
    const rowSelection = {
      selectedCustomerKeys,
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

            <Button className="ant-btn" aria-label="add"
                    onClick={this.onUpdateCustomer}>
              <i className="icon icon-edit gx-mr-2"/>
              <IntlMessages id="actions.edit"/>
            </Button>

            <Button className="ant-btn" type="danger" aria-label="add"
                    onClick={this.onAddContact}>
              <i className="icon icon-trash gx-mr-2"/>
              <IntlMessages id="actions.delete"/>
            </Button>
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
              total: total
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
  onCloseModal
})(Customers);

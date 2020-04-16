import React from "react";
import {Card, Table, Button, Dropdown, Icon, Menu} from "antd";
import log from '../../../util/Log';

const ACTION_MENU = (
  <Menu>
    <Menu.Item key="01">Edit</Menu.Item>
    <Menu.Item key="02">Delete</Menu.Item>
  </Menu>
);

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
  },
  {
    title: 'Action',
    key: 'action',
    width: 120,
    render: (text, record) => (
        <span className="customer-operation">
          <Dropdown overlay={ACTION_MENU}>
            <Button>
              Action <Icon type="down"/>
            </Button>
          </Dropdown>
        </span>
      )
  }
];

class CustomerTable extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCustomerKeys: []
    };
  }

  onSelectChange = (selectedCustomerKeys) => {
    log("selected customer keys: ",selectedCustomerKeys);
    this.setState({selectedCustomerKeys});
  };

  render() {
    const {customerList} = this.props;
    const {selectedCustomerKeys} = this.state;
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
      <Card title="Customer Table">
        <Table className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={customerList} />
      </Card>
    );
  }
}

export default CustomerTable;

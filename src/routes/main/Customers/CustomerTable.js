import React from "react";
import {Card, Table, Button} from "antd";
import log from '../../../util/Log';
import IntlMessages from "../../../util/IntlMessages";

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

class CustomerTable extends React.Component {
  constructor(props) {
    super(props);
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
        <div className="table-operations">
          <Button className="ant-btn" type="primary" aria-label="add"
                  onClick={this.onAddContact}>
            <i className="icon icon-add gx-mr-2"/>
            <IntlMessages id="actions.add.customer"/>
          </Button>

          <Button className="ant-btn" type="primary" aria-label="add"
                  onClick={this.onAddContact}>
            <i className="icon icon-edit gx-mr-2"/>
            <IntlMessages id="actions.edit"/>
          </Button>

          <Button className="ant-btn" type="primary" aria-label="add"
                  onClick={this.onAddContact}>
            <i className="icon icon-trash gx-mr-2"/>
            <IntlMessages id="actions.delete"/>
          </Button>
        </div>
        <Table className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={customerList} />
      </Card>
    );
  }

}

export default CustomerTable;

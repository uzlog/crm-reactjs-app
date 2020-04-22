import React from "react";
import IntlMessages from "../../../util/IntlMessages";
import {Drawer, Tabs} from "antd";
import {connect} from "react-redux";

const {TabPane} = Tabs;

class CustomerView extends React.Component {

  render() {
    const {open, onClose, customerList, selectedCustomers} = this.props;
    const customer = customerList[selectedCustomers[0]];
    return (
      <div>
        {
          customer ?
            <Drawer
              title={customer.name}
              placement="right"
              closable={false}
              onClose={onClose}
              visible={open}
            >
              <Tabs defaultActiveKey="1">
                <TabPane tab={<IntlMessages id="customer.basic"/>} key="1">
                  <p><IntlMessages id="id"/>: {customer._id}</p>
                  <p><IntlMessages id="customer.username"/>: {customer.username}</p>
                  <p><IntlMessages id="customer.role"/>: {customer.role}</p>
                  <p><IntlMessages id="customer.name"/>: {customer.name}</p>
                  <p><IntlMessages id="customer.email"/>: {customer.email}</p>
                  <p><IntlMessages id="customer.phone"/>: {customer.phone}</p>
                  <p><IntlMessages id="customer.birthday"/>: {customer.birthday}</p>
                  <p><IntlMessages id="customer.location"/>: {customer.location}</p>
                </TabPane>
                <TabPane tab={<IntlMessages id="customer.system"/>} key="2">
                  <p><IntlMessages id="customer.active"/>: {customer.active}</p>
                  <p><IntlMessages id="customer.balance"/>: {customer.balance}</p>

                </TabPane>
              </Tabs>

            </Drawer>
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = ({customers}) => {
  const {customerList, selectedCustomers} = customers;
  return {customerList, selectedCustomers}
};

export default connect(mapStateToProps, {})(CustomerView);

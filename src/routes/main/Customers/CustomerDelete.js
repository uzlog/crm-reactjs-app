import React from "react";
import {Modal} from "antd";
import IntlMessages from "../../../util/IntlMessages";

class CustomerDelete extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      loading: false
    }
  };

  showModal = () => {
    this.setState({
      visibleModal: true
    })
  };

  handleYes = () => {
    this.setState({
      loading: true
    });

    this.props.deleteCustomer(this.props.record);

    this.setState({
      visibleModal: false,
      loading: false
    })
  };

  handleNo = () => {
    this.setState({
      visibleModal: false
    });
  };

  render() {
    return (
      <div>
        <span onClick={this.showModal}><IntlMessages id="actions.delete"/></span>

        <Modal
          title="Do you want to delete "
        >

        </Modal>
      </div>
    );
  }
}

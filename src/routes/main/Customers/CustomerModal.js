import React from "react";
import {Avatar, Input, Modal} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {connect} from "react-redux";
import {logout} from "../../../util/Debug";


const thumb = require('assets/images/placeholder.jpg');

class CustomerModal extends React.Component{

  constructor(props) {
    super(props);

    const {key, name, phone, email, username} = props.user;
    this.state = {
      key,
      name,
      phone,
      email,
      username
    }
  }

  render() {
    const {onSaveUser, onUserClose, open, edit} = this.props;
    const {key, name, phone, email, username, password} = edit ? this.props.customerList[this.props.selectedCustomers[0]] : this.state;

    // logout('customer: ', this.props.selectedCustomers[0]);
    // logout(this.props.customerList[this.props.selectedCustomers[0]]);
    // logout({key, name, phone, email, username, password});
    return (
      <Modal
        title={edit ?
          <IntlMessages id="actions.edit.customer"/> :
          <IntlMessages id="actions.add.customer"/>
        }
        toggle={onUserClose}
        visible={open}
        closable={false}
        onOk={() => {
          if (name === ''){   // if name is empty, then does not close modal
            return;
          }

          onUserClose();
          logout(this.state);
          onSaveUser(
            edit,
            {
              'name': name,
              'email': email,
              'phone': phone,
              'username': username,
              'password': password
            }
          );
          this.setState({
            'key': key + 1,
            'name': '',
            'email': '',
            'phone': '',
            'username': ''
          });
        }}
        onCancel={onUserClose}
      >
        <div className="gx-modal-box-row">
          <div className="gx-modal-box-avatar">
            <Avatar size="large" src={thumb}/>
          </div>

          <div className="gx-modal-box-form-item">

            <div className="gx-form-group">
              <Input
                placeholder="Username"
                onChange={(event) => this.setState({username: event.target.value})}
                value={username}
                margin="normal"/>
            </div>

            {
              !edit ?
                <div className="gx-form-group">
                  <Input.Password
                    placeholder="Password"
                    onChange={(event) => this.setState({password: event.target.value})}
                    value={password}
                    margin="normal"/>
                </div> : null
            }

            <div className="gx-form-group">
              <Input
                required
                placeholder="Name"
                onChange={(event) => this.setState({name: event.target.value})}
                defaultValue={name}
                margin="none"/>
            </div>

            <div className="gx-form-group">
              <Input
                placeholder="Email"
                onChange={(event) => this.setState({email: event.target.value})}
                defaultValue={email}
                margin="normal"/>
            </div>

            <div className="gx-form-group">
              <Input
                placeholder="Phone"
                onChange={(event) => this.setState({phone: event.target.value})}
                defaultValue={phone}
                margin="normal"
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({customers}) => {
  const {customerList, selectedCustomers, edit} = customers;
  return {customerList, selectedCustomers, edit};
};



export default connect(mapStateToProps, {

})(CustomerModal);

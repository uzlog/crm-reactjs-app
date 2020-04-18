import React from "react";
import {Avatar, Input, Modal} from "antd";

import IntlMessages from "../../../util/IntlMessages";

const thumb = require('assets/images/placeholder.jpg');

class AddCustomer extends React.Component{

  constructor(props) {
    super(props);

    const {id, name, phone, email} = props.user;
    this.state = {
      id,
      name,
      phone,
      email
    }
  }

  render() {
    const {userKey, onSaveUser, onUserClose, open, user} = this.props;
    const {id, name, phone, email} = this.state;

    return (
      <Modal
        title={user.name === '' ?
        <IntlMessages id="actions.add.customer"/> :
        <IntlMessages id="actions.edit.customer"/>}
        toggle={onUserClose}
        visible={open}
        closable={false}
        onOk={() => {
          if (name === ''){
            return;
          }

          onUserClose();
          onSaveUser(
            userKey,
            {
              'name': name,
              'email': email,
              'phone': phone
            }
          );
          this.setState({
            'id': id + 1,
            'name': '',
            'email': '',
            'phone': ''
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
                value={email}
                margin="normal"/>
            </div>

            <div className="gx-form-group">
              <Input
                placeholder="Phone"
                onChange={(event) => this.setState({phone: event.target.value})}
                value={phone}
                margin="normal"
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddCustomer;

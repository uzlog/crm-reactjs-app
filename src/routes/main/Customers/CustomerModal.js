import React from "react";
import {Avatar, Input, Modal} from "antd";
import IntlMessages from "../../../util/IntlMessages";

import {logout} from "../../../util/Debug";


const thumb = require('assets/images/placeholder.jpg');

class CustomerModal extends React.Component{

  constructor(props) {
    super(props);

    const {id, name, phone, email, username} = props.user;
    this.state = {
      id,
      name,
      phone,
      email,
      username
    }
  }

  render() {
    const {userKey, onSaveUser, onUserClose, open, user} = this.props;
    const {id, name, phone, email, username, password} = this.state;

    // logout(username);
    return (
      <Modal
        title={user.name === '' ?
        <IntlMessages id="actions.add.customer"/> :
        <IntlMessages id="actions.edit.customer"/>}
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
            userKey,
            {
              'name': name,
              'email': email,
              'phone': phone,
              'username': username,
              'password': password
            }
          );
          this.setState({
            'id': id + 1,
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
              !this.username ?
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

export default CustomerModal;

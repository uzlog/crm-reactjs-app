import React from "react";
import {Input, Modal, Form} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {connect} from "react-redux";
import {logout} from "../../../util/Debug";
import {PHONE_REGEX, USERNAME_REGEX} from "../../../constants/Regex";


// const thumb = require('assets/images/placeholder.jpg');
const FormItem = Form.Item;


class CustomerModal extends React.Component {

  // form = Form.useForm();

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
    const {key, name, phone, email, username} = edit ? this.props.customerList[this.props.selectedCustomers[0]] : this.state;

    // logout('customer: ', this.props.selectedCustomers[0]);
    // logout(this.props.customerList[this.props.selectedCustomers[0]]);
    // logout({key, name, phone, email, username, password});
    // return (
    //   <Modal
    //     title={edit ?
    //       <IntlMessages id="actions.edit.customer"/> :
    //       <IntlMessages id="actions.add.customer"/>
    //     }
    //     toggle={onUserClose}
    //     visible={open}
    //     closable={false}
    //     onOk={() => {
    //       if (name === ''){   // if name is empty, then does not close modal
    //         return;
    //       }
    //
    //       onUserClose();
    //       logout(this.state);
    //       onSaveUser(
    //         edit,
    //         {
    //           'name': name,
    //           'email': email,
    //           'phone': phone,
    //           'username': username,
    //           'password': password
    //         }
    //       );
    //       this.setState({
    //         'key': key + 1,
    //         'name': '',
    //         'email': '',
    //         'phone': '',
    //         'username': ''
    //       });
    //     }}
    //     onCancel={onUserClose}
    //   >
    //     <div className="gx-modal-box-row">
    //       <div className="gx-modal-box-avatar">
    //         <Avatar size="large" src={thumb}/>
    //       </div>
    //
    //       <div className="gx-modal-box-form-item">
    //
    //         <div className="gx-form-group">
    //           <Input
    //             placeholder="Username"
    //             onChange={(event) => this.setState({username: event.target.value})}
    //             value={username}
    //             margin="normal"/>
    //         </div>
    //
    //         {
    //           !edit ?
    //             <div className="gx-form-group">
    //               <Input.Password
    //                 placeholder="Password"
    //                 onChange={(event) => this.setState({password: event.target.value})}
    //                 value={password}
    //                 margin="normal"/>
    //             </div> : null
    //         }
    //
    //         <div className="gx-form-group">
    //           <Input
    //             required
    //             placeholder="Name"
    //             onChange={(event) => this.setState({name: event.target.value})}
    //             defaultValue={name}
    //             margin="none"/>
    //         </div>
    //
    //         <div className="gx-form-group">
    //           <Input
    //             placeholder="Email"
    //             onChange={(event) => this.setState({email: event.target.value})}
    //             defaultValue={email}
    //             margin="normal"/>
    //         </div>
    //
    //         <div className="gx-form-group">
    //           <Input
    //             placeholder="Phone"
    //             onChange={(event) => this.setState({phone: event.target.value})}
    //             defaultValue={phone}
    //             margin="normal"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </Modal>
    // );

    // const {getFieldDecorator} = form;

    const {getFieldDecorator} = this.props.form;

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
          this.props.form.validateFields()
            .then(value => {
              this.props.form.resetFields();
              onUserClose();
              logout(value);
              onSaveUser(
                edit,
                {key: key, ...value}
              );
              this.setState({
                'key': key + 1,
                'name': '',
                'email': '',
                'phone': '',
                'username': ''
              });
            })
        }}

        onCancel={() => {
          this.props.form.resetFields();
          onUserClose();
          this.setState({
            'key': key + 1,
            'name': '',
            'email': '',
            'phone': '',
            'username': ''
          });
        }}
      >
        <Form>
          <FormItem
            name="username"
            label="Username"
          >
            {getFieldDecorator('username', {
              initialValue: username,
              rules: [
                {
                  required: true,
                  pattern: new RegExp(USERNAME_REGEX),   // no need to define type of validation. In docs of antd, it said there a "type" field, but it does not work.
                  message: 'Invalid Username!'
                }, {
                  required: true, message: 'Please input your username!',
                },]
            })(
              <Input id="username" disabled={edit}/>
            )}
          </FormItem>

          { edit ? null :
            <FormItem
              name="password"
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  required: true,
                  min: 6,
                  message: 'Password at least 6 characters!'
                }],
              })(
                <Input.Password id="password"/>
              )}
            </FormItem>
          }

          <FormItem
            name="name"
            label="Name"
          >
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{
                required: true, message: 'Please input the name',
              }]
            })(
              <Input id="name"/>
            )}
          </FormItem>

          <FormItem
            name="email"
            label="Email"
          >
            {getFieldDecorator('email', {
              initialValue: email,
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input id="email1"/>
            )}
          </FormItem>

          <FormItem
            name="phone"
            label="Phone Number"
          >
            {getFieldDecorator('phone', {
              initialValue: phone,
              rules: [{
                require: true,
                message: 'Invalid phone number!',
                pattern: new RegExp(PHONE_REGEX)
              }, {
                required: true, message: 'Please input your phone number!',
              }],
            })(
              <Input id="phone"/>
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}


const CustomerFormModal = Form.create()(CustomerModal);

const mapStateToProps = ({customers}) => {
  const {customerList, selectedCustomers, edit} = customers;
  return {customerList, selectedCustomers, edit};
};

export default connect(mapStateToProps, {})(CustomerFormModal);

import React from 'react';
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import router from 'umi/router';
import {setAuthority} from "@/utils/authority";
@connect(({ global }) => ({
  global,
}))
// eslint-disable-next-line react/prefer-stateless-function
class ChangePassword extends React.Component {
  state = {
    repectPassword: {
      State: 'success',
      repectPasswordErrorMsg: '',
    },
    password: {
      State: 'success',
      passwordErrorMsg: '',
    },
  }
  showRepectPasswordError = () => {
    this.setState({
      repectPassword: {
        State: 'error',
        repectPasswordErrorMsg: '输入密码不一致',
      },
    })
  }
  showPasswordError = () => {
    this.setState({
      password: {
        State: 'error',
        passwordErrorMsg: '请输入正确的密码格式',
      },
    })
  }
  handlePassword = e => {
    const reg = /^\w{6,12}$/;
    const { form } = this.props;
    if(form.getFieldValue('repectPassword')){
      this.handleRepectPassword('repectPassword', e)
    }
    if(!reg.test(e.target.value)) {
      this.showPasswordError()
    }else{
      this.setState({
        password: {
          State: 'success',
          passwordErrorMsg: '',
        },
      })
    }
  }
  handleRepectPassword = (key, e) => {
    const { form } = this.props;
    if(e.target.value !== form.getFieldValue(key)){
      this.showRepectPasswordError()
    }else{
      this.setState({
        repectPassword: {
          State: 'success',
          repectPasswordErrorMsg: '',
        },
      })
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { repectPassword, password } = this.state;
    this.props.form.validateFields((err, values) => {
      if(!err && repectPassword.State === 'success' && password.State === 'success'){
        console.log(values)
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { repectPassword, password } = this.state
    return (
      <div style={{ width: '40%', margin: '0 auto' }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('idcard', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="身份证"
              />,
            )}
          </Form.Item>
          <Form.Item
            validateStatus={password.State}
            help={password.passwordErrorMsg}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
                onChange={this.handlePassword}
              />,
            )}
          </Form.Item>
          <Form.Item
            validateStatus={repectPassword.State}
            help={repectPassword.repectPasswordErrorMsg}
          >
            {getFieldDecorator('repectPassword', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="重复密码"
                onChange={this.handleRepectPassword.bind(this,'password')}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'40%'}}>
                登录
              </Button>
              <Button type="primary" onClick={router.goBack} className="login-form-button" style={{width:'40%'}}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const ChangePasswordForm = Form.create({ name: 'normal_login' })(ChangePassword)
export default connect(({ global }: ConnectState) => ({
  loginable: global.loginable,
}))(ChangePasswordForm);

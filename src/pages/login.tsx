import React from 'react';
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import router from 'umi/router';
import { setAuthority } from '@/utils/authority';
@connect(({ global }) => ({
  global,
}))
// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { dispatch } = this.props;
        dispatch({
          type: 'global/loginData',
          state: this.state,
          payload: true,
        })
        setAuthority(['aaa', 'admin'])
        router.push('/')
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ width: '40%', margin: '0 auto' }}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
            登录
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
      </div>
    );
  }
}
const LoginForm = Form.create({ name: 'normal_login' })(Login)
export default connect(({ global }: ConnectState) => ({
  loginable: global.loginable,
}))(LoginForm);

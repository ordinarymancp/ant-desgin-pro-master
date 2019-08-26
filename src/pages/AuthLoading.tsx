import React, { Component } from 'react'
import { connect } from 'dva';
import { Router, Route, Redirect, withRouter } from 'dva/router';
import { message } from 'antd';
import {ConnectState} from "@/models/connect";

class AuthLoading extends Component {
  render() {
    console.log(this.props)
    if (!this.props.loginable) {
      message.warning('您需要先登陆');
    }
    return (
      this.props.loginable

    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}
// export default ListData;
export default connect(({ global }: ConnectState) => ({
  loginable: global.loginable,
}))(AuthLoading);

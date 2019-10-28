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
class Redirect extends React.Component {
  componentDidMount(): void {
    // const { iframeUrl } = this.props
    // console.log(iframeUrl)
    const url = JSON.parse(localStorage.getItem('iframeUrl'));
    console.log(url)
    window.location.href = url.iframeUrl
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  iframeUrl: global.iframeUrl,
}))(Redirect);

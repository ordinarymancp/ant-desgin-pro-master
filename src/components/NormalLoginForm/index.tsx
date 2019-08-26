import React from 'react';
import { DatePicker } from 'antd';
import { connect } from 'dva/index';
import {ConnectState} from "@/models/connect";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
@connect(({ global }) => ({
  global,
}))
// eslint-disable-next-line react/prefer-stateless-function
class NormalLoginForm extends React.Component {
  state = {
    page: 1,
  }

  const btnClick = () => {
    const { dispatch } = this.props;
    this.setState( { page: 2 })
    dispatch({
      type: 'global/saveNotices',
      state: this.state,
      payload: [1, 2, 3],
    })
  }
  render() {
    const {
      global: {
        data
      },
    } = this.props;
    console.log(this.props)
    return (
      <div>
        <div>{this.props.page}</div>
        <button onClick={this.btnClick}>111</button>
        <DatePicker />
        <br />
        <MonthPicker placeholder="Select month" />
        <br />
        <RangePicker />
        <br />
        <WeekPicker placeholder="Select week" />
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
  page: global.page,
  notices: global.notices,
}))(NormalLoginForm);

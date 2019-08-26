import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva/index';
import { ConnectState } from '@/models/connect';
@connect(({ global }) => ({
  global,
}))
// eslint-disable-next-line react/prefer-stateless-function
class TableComponent extends React.Component {
  render() {
    const {
      global: {
        data
      },
    } = this.props;
    return (
      <Table dataSource={this.props.tableData.dataSource } columns={this.props.tableData.columns} />
  );
  }
}
export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
  page: global.page,
  notices: global.notices,
  tableData: global.tableData,
}))(TableComponent);

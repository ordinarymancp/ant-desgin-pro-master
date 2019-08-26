import React from 'react';
import { connect } from 'dva';
import {
  Form, Button, Input, Select, Row, Col,
} from 'antd';
let record = {};
const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const QueryForm = (props) => {
  console.log(props)
  const { form, btnTxt, dispatch } = props;
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = form;
  console.log(record,props.record)
  if(JSON.stringify(record) !== JSON.stringify(props.record)){
    console.log('ininin')
    record = props.record
    setFieldsValue(record)
  }
  // 搜索按钮
  const queryClick = (e) => {
    e.preventDefault();
    const values = getFieldsValue();
    dispatch({
      type: 'dataTransfer/queryData',
      carData: values,
    });
  };

  // 重置按钮
  const handleReset = () => {
    form.resetFields();
  };

  const keyWordChange = (e) => {
    if (e.target.value === '') {
      dispatch({
        type: 'dataTransfer/emptyWord',
      });
    }
  };

  // 自定义校验
  const checkName = (rule, value, callback) => {
    if (value && value.length > 5) {
      callback('测试下自定义校验');
    }
    callback();
  };

  // 添加
  const handleAdd = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        values['key'] = "5"
        const { dispatch } = props;
        dispatch({
          type: 'global/addTableData',
          state: [],
          payload: values,
        })
        props.onChangeState()
      }
    });
  };

  return (
    <Form onSubmit={queryClick}>
      <Row>
        <Col ms={24} md={18} lg={18}>
          <FormItem {...formItemLayout} label="姓名">
            {getFieldDecorator('name', {
              rules: [{required: false, message: 'Please input your username!'}],
            })(
              <Input placeholder="搜索仅作用于此字段" />
            )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col ms={24} md={18} lg={18}>
          <FormItem {...formItemLayout} label="年龄">
            {getFieldDecorator('age', {
              rules: [{required: false, message: 'Please input your username!'}],
            })(
              <Input placeholder="搜索仅作用于此字段"/>
            )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col ms={24} md={18} lg={18}>
          <FormItem {...formItemLayout} label="地址">
            {getFieldDecorator('address', {
              rules: [{required: false, message: 'Please input your username!'}],
            })(
              <Input placeholder="搜索仅作用于此字段"/>
            )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" icon="search">
            {btnTxt}
          </Button>
          <Button icon="redo" onClick={handleReset} style={{ marginLeft: 10 }}>重置</Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={handleAdd}>添加</Button>
        </Col>
      </Row>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};
const FormQuery = Form.create()(QueryForm);
export default connect(mapStateToProps)(FormQuery);

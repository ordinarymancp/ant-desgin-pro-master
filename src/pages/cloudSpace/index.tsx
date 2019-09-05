import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Tabs, Button, Modal, Form, Input, List, Empty } from 'antd';
import videojs from 'video.js/dist/video.js';
import 'videojs-flash';
import 'videojs-contrib-hls';
import 'video.js/dist/video-js.css';
import styles from '@/pages/settings/index.scss';
import router from 'umi/router';
const { TabPane } = Tabs;
@connect(({ global }) => ({
  global,
})) // eslint-disable-next-line react/prefer-stateless-function
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      // @ts-ignore
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal visible={visible} title="视频添加" okText="创建" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
            <Form.Item label="视频路径">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入视频路径' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="视频名称">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: '请输入视频名称' }],
              })(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
// eslint-disable-next-line @typescript-eslint/class-name-casing
class cloudSpace extends React.Component {
  public player1: any;

  // eslint-disable-next-line react/sort-comp
  componentDidMount(): void {
    if (localStorage.getItem('cloudSpace')) {
      // eslint-disable-next-line no-shadow
      const { cloudSpace } = JSON.parse(localStorage.getItem('cloudSpace') as string);
      const { videoList, imageList, musicList, textList } = cloudSpace;
      this.setState({ videoList, imageList, musicList, textList });
    } else {
      localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace: this.state }));
    }
  }

  componentWillUnmount() {
    if (this.player1) {
      this.player1.dispose();
    }
  }

  state = {
    viedoModelVisible: false,
    visible: false,
    videoList: [],
    // eslint-disable-next-line react/no-unused-state
    imageList: [],
    // eslint-disable-next-line react/no-unused-state
    musicList: [],
    // eslint-disable-next-line react/no-unused-state
    textList: [],
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err: any, values: { title: any; description: any }) => {
      if (err) {
        return;
      }
      this.settingCloudVideo(values.title, values.description);
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  settingCloudVideo = (path: any, name: any) => {
    // eslint-disable-next-line no-shadow
    const { cloudSpace } = JSON.parse(localStorage.getItem('cloudSpace') as string);
    cloudSpace.videoList.push({ path, name });
    this.setState({
      videoList: cloudSpace.videoList,
    });
    localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace }));
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  // 删除云视频
  deleteCloudVideo = (index: any) => {
    // eslint-disable-next-line no-shadow
    const { cloudSpace } = JSON.parse(localStorage.getItem('cloudSpace') as string);
    cloudSpace.videoList.splice(index, 1);
    this.setState({
      videoList: cloudSpace.videoList,
    });
    localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace }));
  };

  videoReload = (path: any) => {
    console.log(path);
    const videoFileStream = path;
    const options = {
      width: '450px',
      height: '300px',
      controls: 'controls',
      preload: 'auto',
      autoPlay: 'autoPlay',
      isFullscreen: true,
    };
    this.player1 = videojs('myVideo1', options);
    this.player1.src({
      src: videoFileStream,
    });
    this.player1.load();
    this.player1.play();
  };

  showViedoModal = (path: any) => {
    this.setState({ viedoModelVisible: true }, () => {
      setTimeout(() => {
        this.videoReload(path);
      }, 200);
    });
  };

  handleVideoCancel = () => {
    this.setState({ viedoModelVisible: false });
  };

  gotoIndex = () => {
    router.push('/index');
  };

  render() {
    const { videoList, viedoModelVisible } = this.state;
    return (
      <div className="overview">
        <span className={styles.gotoIndex} onClick={this.gotoIndex}>
          前往主页
        </span>
        <Modal
          visible={viedoModelVisible}
          title="视频预览"
          onCancel={this.handleVideoCancel}
          onOk={this.handleVideoCancel}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <video id="myVideo1" className="video-js">
              <p className="vjs-no-js">您的浏览器不支持HTML5，请升级浏览器。</p>
              <track kind="captions" />
            </video>
          </div>
        </Modal>
        <Tabs tabPosition="left" style={{ height: 400, color: 'rgba(255, 255, 255, 0.65)' }}>
          <TabPane tab="视频" key="视频">
            <Button type="primary" onClick={this.showModal}>
              添加视频
            </Button>
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
            {videoList.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={videoList}
                style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <a
                        key="list-loadmore-view"
                        onClick={this.showViedoModal.bind(this, item.path)}
                      >
                        预览
                      </a>,
                      <a key="list-loadmore-edit" onClick={this.deleteCloudVideo.bind(this, index)}>
                        删除
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      title={<h4 style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{item.name}</h4>}
                      description={
                        <h4 style={{ color: 'rgba(255, 255, 255, 0.65)' }}>视频地址:{item.path}</h4>
                      }
                      style={{ color: 'rgba(255, 255, 255, 0.65) !important' }}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty />
            )}
          </TabPane>
          <TabPane tab="文档" key="文档">
            <Empty />
          </TabPane>
          <TabPane tab="图片" key="图片">
            <Empty />
          </TabPane>
          <TabPane tab="音频" key="音频">
            <Empty />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({}))(cloudSpace);

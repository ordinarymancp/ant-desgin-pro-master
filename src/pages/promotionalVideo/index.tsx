import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
// @ts-ignore
// eslint-disable-next-line import/extensions
import videojs from 'video.js/dist/video.js';
import 'videojs-flash';
import 'videojs-contrib-hls';
import 'video.js/dist/video-js.css';
import { Modal, notification, List, Empty, Radio, Icon } from 'antd';
import styles from './index.scss';
import VideoButton from "@/components/VideoButton";
// @ts-ignore
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class promotionalVideo extends React.Component {
  public player1: any;

  state = {
    checkedPath: '',
    videoPath: '',
    videoList: [],
    visible: false,
  };

  // eslint-disable-next-line react/sort-comp
  componentWillUnmount() {
    if (this.player1) {
      this.player1.dispose();
    }
  }

  componentDidMount(): void {
    if (localStorage.getItem('settings')) {
      const settingsValue = JSON.parse(localStorage.getItem('settings') as string);
      const { videoPath } = settingsValue;
      if (this.state.videoPath !== '') {
        // this.setState({
        //   videoPath: window.URL.createObjectURL(videoPath),
        // })
      } else {
        const videoFileStream = 'http://vjs.zencdn.net/v/oceans.mp4';
        this.videoReload(videoFileStream)
      }
    }
    if (localStorage.getItem('cloudSpace')) {
      const { videoList } = JSON.parse(localStorage.getItem('cloudSpace') as string).cloudSpace;
      const defaultVideo = { name: '宣传视频', path: 'http://vjs.zencdn.net/v/oceans.mp4  ' }
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        videoList: [defaultVideo, ...videoList],
      })
    }
  }
  // 视频重置

  videoReload = (path: any) => {
    const videoFileStream = path;
    const options = {
      width: '1000px',
      height: '500px',
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
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { checkedPath, videoPath } = this.state;
    if (checkedPath && checkedPath !== videoPath) {
      this.setState({
        visible: false,
        videoPath: checkedPath,
      });
      this.videoReload(checkedPath);
      notification.open({
        message: '切换成功',
        icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    } else {
      this.setState({
        visible: false,
      })
    }
  };

  handleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e: { target: { value: any; }; }) => {
    this.setState({
      checkedPath: e.target.value,
    });
  };

  render() {
    const { videoList, checkedPath } = this.state;
    return (
      <div>
        {/*<VideoButton/>*/}
        <div style={{ width: '1000px', margin: '20px  auto', position: 'relative' }}>
          <div className={styles.leftTopBorder}></div>
          <div className={styles.leftTopOverBorder}></div>
          <div className={styles.topBorder}></div>
          <div className={styles.topOverBorder}></div>
          <div className={styles.leftBottomBorder}></div>
          <div className={styles.leftBottomOverBorder}></div>
          <div className={styles.bottomBorder}></div>
          <div className={styles.bottomOverBorder}></div>
          <video
            id="myVideo1"
            className="video-js"
          >
            <p className="vjs-no-js">
              您的浏览器不支持HTML5，请升级浏览器。
            </p>
            <track kind="captions" />
          </video>
        </div>
        <div style={{ width: '15%', height: '100%', float: 'left' }}>
          <div className={styles.antProSettingDrawerHandle} onClick={this.showModal}>
            <Icon type="setting" style={{ color: 'white' }}/>
          </div>
          <Modal
            title="选择云视频"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div style={{width: '100%'}}>
              {videoList.length > 0 ?
                // @ts-ignore
                <Radio.Group value={checkedPath} onChange={this.onChange}>
                <List
                  itemLayout="horizontal"
                  dataSource={videoList}
                  renderItem={(item) => (
                    <List.Item
                      extra={
                        // @ts-ignore
                        <Radio name="videos" value={item.path} style={{ marginLeft: '50px'}}/>
                      }
                    >
                      <List.Item.Meta
                        // @ts-ignore
                        title={item.name}
                        // @ts-ignore
                        description={`视频地址:${item.path}`}
                      />
                    </List.Item>
                  )}
                /></Radio.Group> : <Empty />
              }
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({

}))(promotionalVideo);

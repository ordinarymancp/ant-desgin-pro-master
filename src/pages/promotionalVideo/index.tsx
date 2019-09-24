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
import VideoButton from '@/components/VideoButton';
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
    isplay: true,
    orginPath:
      'http://1300104663.vod2.myqcloud.com/85f6033avodcq1300104663/3634e7365285890793317258780/WoZ3aMAHBD4A.mp4',
  };

  // eslint-disable-next-line react/sort-comp
  componentWillUnmount() {
    if (this.player1) {
      this.player1.dispose();
    }
  }

  componentDidMount(): void {
    if (localStorage.getItem('settings')) {
      const settingsValue = JSON.parse(localStorage.getItem('settings') as string) || {};
      // const { videoPath } = settingsValue;
      if (this.state.videoPath !== '') {
        // this.setState({
        //   videoPath: window.URL.createObjectURL(videoPath),
        // })
      } else {
        const videoFileStream =
          'http://1300104663.vod2.myqcloud.com/85f6033avodcq1300104663/3634e7365285890793317258780/WoZ3aMAHBD4A.mp4';
        this.videoReload(videoFileStream, true);
      }
    } else {
      this.videoReload(
        'http://1300104663.vod2.myqcloud.com/85f6033avodcq1300104663/3634e7365285890793317258780/WoZ3aMAHBD4A.mp4',
        true,
      );
    }
    if (localStorage.getItem('cloudSpace')) {
      const { videoList } = JSON.parse(localStorage.getItem('cloudSpace') as string).cloudSpace;
      const defaultVideo =
        'http://1300104663.vod2.myqcloud.com/85f6033avodcq1300104663/3634e7365285890793317258780/WoZ3aMAHBD4A.mp4 ';
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        videoList: [defaultVideo, ...videoList],
      });
    }
    this.player1.on('click', this.videoPlay);
    // this.fullscreen()
  }
  // 视频重置

  videoReload = (path: any, canplay: true) => {
    const videoFileStream = path;
    const options = {
      height: '500px',
      controls: 'controls',
      preload: 'auto',
      autoPlay: 'autoPlay',
      isFullscreen: false,
      fluid: true,
    };
    this.player1 = videojs('myVideo1', options);
    this.player1.src({
      src: videoFileStream,
    });
    this.player1.load();
    if (canplay) {
      this.player1.play();
    }
  };

  videoPlay = () => {
    const { isplay } = this.state;
    if (isplay) {
      this.player1.pause();
      this.setState({
        isplay: false,
      });
    } else {
      this.player1.play();
      this.setState({
        isplay: true,
      });
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { checkedPath, videoPath, orginPath } = this.state;
    if (checkedPath && checkedPath !== videoPath) {
      this.setState({
        visible: false,
        videoPath: checkedPath,
        isplay: true,
      });
      if (checkedPath !== orginPath) {
        console.log(checkedPath, orginPath);
        this.videoReload('http://192.168.1.102:3000/video?name=' + checkedPath, true);
      } else {
        this.videoReload(orginPath, true);
      }
      notification.open({
        message: '切换成功',
        icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    } else {
      this.setState({
        visible: false,
      });
    }
  };

  fullscreen = () => {
    this.player1.requestFullscreen();
  };

  handleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e: { target: { value: any } }) => {
    this.setState({
      checkedPath: e.target.value,
    });
  };

  render() {
    const { videoList, checkedPath, isplay } = this.state;
    return (
      <div style={{ marginTop: '120px' }}>
        <div style={{ width: '60%', height: '500px', margin: '20px  auto', position: 'relative' }}>
          <div className={styles.leftTopBorder} />
          <div className={styles.leftTopOverBorder} />
          <div className={styles.topBorder} />
          <div className={styles.topOverBorder} />
          <div className={styles.leftBottomBorder} />
          <div className={styles.leftBottomOverBorder} />
          <div className={styles.bottomBorder} />
          <div className={styles.bottomOverBorder} />
          <div style={{ position: 'absolute', top: '230px', left: '-75px', zIndex: '999' }}>
            <VideoButton icon="全屏" handleClick={this.fullscreen} />
          </div>
          <div
            style={{ position: 'absolute', top: '330px', left: '-75px', zIndex: '999' }}
            onClick={this.videoPlay}
          >
            <VideoButton icon={!isplay ? '播放' : '暂停'} />
          </div>
          <div style={{ position: 'absolute', top: '430px', left: '-75px', zIndex: '999' }}>
            <VideoButton icon="设置" handleClick={this.showModal} />
          </div>
          <video
            playsinline
            id="myVideo1"
            className="video-js  vjs-big-play-centered vjs-fluid"
            style={{ height: '100%' }}
          >
            <p className="vjs-no-js">您的浏览器不支持HTML5，请升级浏览器。</p>
            <track kind="captions" />
          </video>
        </div>
        <div style={{ width: '15%', height: '100%', float: 'left' }}>
          <Modal
            title="选择云视频"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div style={{ width: '100%' }}>
              {videoList.length > 0 ? (
                // @ts-ignore
                <Radio.Group value={checkedPath} onChange={this.onChange} style={{ width: '100%' }}>
                  <List
                    itemLayout="horizontal"
                    dataSource={videoList}
                    renderItem={item => (
                      <List.Item
                        extra={
                          // @ts-ignore
                          <Radio name="videos" value={item} style={{ float: 'right' }} />
                        }
                      >
                        <List.Item.Meta
                          // @ts-ignore
                          title={item}
                          // @ts-ignore
                          style={{ wordBreak: 'break-all' }}
                        />
                      </List.Item>
                    )}
                  />
                </Radio.Group>
              ) : (
                <Empty />
              )}
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({}))(promotionalVideo);

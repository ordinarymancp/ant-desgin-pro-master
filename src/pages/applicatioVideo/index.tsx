import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.scss';
import router from 'umi/router';
import PageLoading from '@/components/PageLoading';
import MenuItem from '@/components/MenuItem';
import { message } from 'antd';
import videojs from 'video.js/dist/video.js';
import 'videojs-flash';
import 'videojs-contrib-hls';
import 'video.js/dist/video-js.css';
import FixedVideo from '@/components/FixedVideo';

@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function
class applicatioVideo extends React.Component {
  public player1: any;
  public timer: any;
  componentDidMount(): void {
    // const titleGroup = this.props.match.params.name.split('&');
    // this.setState({
    //   preTitle: titleGroup[0],
    //   nextTitle: titleGroup[1],
    // })
    const { match } = this.props;
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup'));
    solutionGroup.forEach(item => {
      item.solutionSonGroup.forEach(items => {
        if (items.name === match.params.name) {
          this.setState({
            content: items.name,
            videoUrl: items.videoUrl,
          },() => {
            this.videoReload(items.videoUrl, true);
          });
        }
      });
    });
  }

  state = {
    canHidden: false,
    iframeUrl: '',
    content: '',
    currentModel: '',
    hiddenState: true,
    zindex: 99,
    mousemoveState: true,
    globalClientY: 999,
    canplay: true,
    videoUrl: ''
  };

  componentWillUnmount() {
    if (this.player1) {
      this.player1.dispose();
    }
  }

  videoReload = (path: any, canplay: true) => {
    const videoFileStream = path;
    const options = {
      controls: 'controls',
      preload: 'auto',
      autoPlay: 'autoPlay',
      isFullscreen: false,
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

  hiddenLoading = () => {
    this.setState({ canHidden: false });
  };
  findAndSet = () => {
    const { content } = this.state;
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup'));
    solutionGroup.forEach(item => {
      item.solutionSonGroup.forEach(items => {
        if (items.name === content) {
          items.collected = true;
          message.info('收藏成功', [1]);
        }
      });
    });
    localStorage.setItem('solutionGroup', JSON.stringify({ solutionGroup }));
  };
  goNext = () => {
    const { content } = this.state;
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup'));
    solutionGroup.forEach(item => {
      item.solutionSonGroup.forEach((items, index) => {
        if (items.name === content) {
          if (item.solutionSonGroup[index + 1]) {
            if(item.solutionSonGroup[index + 1].url) {
              const {dispatch} = this.props;
              dispatch({
                type: 'global/setIframeUrl',
                payload: {iframeUrl: item.solutionSonGroup[index + 1].url},
              });
              router.push('/index/applicatioScenarioIndex/' + item.solutionSonGroup[index + 1].name);
              const iframeUrlString = JSON.stringify({
                iframeUrl: item.solutionSonGroup[index + 1].url,
              });
              localStorage.setItem('iframeUrl', iframeUrlString);
              location.reload();
            }else{
              router.push('/applicatioVideo/' + item.solutionSonGroup[index + 1].name);
              location.reload();
            }
          } else {
            message.warning('这是第一个场景');
          }
        }
      });
    });
  };

  goPre = () => {
    const { content } = this.state;
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup'));
    solutionGroup.forEach(item => {
      item.solutionSonGroup.forEach((items, index) => {
        if (items.name === content) {
          if (item.solutionSonGroup[index - 1]) {
            if(item.solutionSonGroup[index - 1].url) {
              const {dispatch} = this.props;
              dispatch({
                type: 'global/setIframeUrl',
                payload: {iframeUrl: item.solutionSonGroup[index - 1].url},
              });
              router.push('/index/applicatioScenarioIndex/' + item.solutionSonGroup[index - 1].name);
              const iframeUrlString = JSON.stringify({
                iframeUrl: item.solutionSonGroup[index - 1].url,
              });
              localStorage.setItem('iframeUrl', iframeUrlString);
              location.reload();
            }else{
              router.push('/applicatioVideo/' + item.solutionSonGroup[index - 1].name);
              location.reload();
            }
          } else {
            message.warning('这是第一个场景');
          }
        }
      });
    });
  };

  goBack = () => {
    const currentModel = localStorage.getItem('currentMosel');
    router.push('/applicatioScenarioNext/' + currentModel);
  };

  buttonClick = () => {
    this.setState({
      hiddenState: !this.state.hiddenState,
    });
  };

  movein = () => {
    this.setState({
      hiddenState: false,
    });
  };

  moveout = () => {
    this.setState({
      hiddenState: true,
    });
  };

  pauseorplay = () => {
    const { canplay } = this.state;
    if (canplay) {
      this.player1.pause();
      this.setState({ canplay: false });
    } else {
      this.player1.play();
      this.setState({ canplay: true });
    }
  };

  render() {
    // const {preTitle, nextTitle} = this.state;
    const { iframeUrl, canHidden, hiddenState } = this.state;
    const { match } = this.props;
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'rgba(15, 10, 11, 1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{ position: 'fixed', height: '100%', width: '0.5%', right: 0, zIndex: '999' }}
          onMouseOver={this.movein}
          onMouseOut={this.moveout}
        >
          <div
            style={{ width: '70%', height: '100%', background: 'rgba(0,0,0,0.3)', float: 'right' }}
          >
            <div
              hidden={hiddenState}
              style={{
                height: '47%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                bottom: '0',
                position: 'fixed',
                right: '0.5%',
                bottom: '12%',
                background: 'rgba(0,0,0,0.3)',
                padding: '10px 20px',
              }}
            >
              <div className={styles.buttonWrap}>
                <MenuItem content="上个场景" handleClick={this.goPre} />
              </div>
              <div className={styles.buttonWrap}>
                <MenuItem content="下个场景" handleClick={this.goNext} />
              </div>
              <div className={styles.buttonWrap}>
                <MenuItem content="加入收藏" handleClick={this.findAndSet} />
              </div>
              <div className={styles.buttonWrap}>
                <MenuItem content="暂停/播放" handleClick={this.pauseorplay} />
              </div>
              <div className={styles.buttonWrap}>
                <MenuItem
                  content="重放"
                  handleClick={this.videoReload.bind(
                    this,
                    this.state.videoUrl,
                    true,
                  )}
                />
              </div>
              <div className={styles.buttonWrap}>
                <MenuItem content="返回" handleClick={this.goBack} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.xuanfuBurron} onClick={this.buttonClick}>
          <div className={styles.xunfuButtonSecond}>
            <div className={styles.xunfuButtonThird}></div>
          </div>
        </div>

        <div style={{ width: '100%', height: '100%', position: 'relative', float: 'left' }}>
          <div style={{ display: `${canHidden ? 'block' : 'none'}` }}>
            <PageLoading />
          </div>
          <div
            style={{
              position: 'fixed',
              width: '100%',
              height: '100%',
              zIndex: `${this.state.zindex}`,
            }}
            onMouseMove={e => {
              if (this.state.mousemoveState) {
                this.setState({ globalClientY: e.clientY });
                if (e.clientY < 50) {
                  this.setState({ zindex: 1 });
                }else{
                  this.setState({ zindex: 99 });
                }
                this.timer = setTimeout(() => {
                  this.setState({ mousemoveState: true });
                }, 100);
              }
            }}
          >
            <div style={{ width: '100%', height: '100%' }}>
              <video
                playsinline
                id="myVideo1"
                className="video-js  vjs-big-play-centered "
                style={{ height: '100%', width: '100%' }}
              >
                <p className="vjs-no-js">您的浏览器不支持HTML5，请升级浏览器。</p>
                <track kind="captions" />
              </video>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  solutionGroup: global.solutionGroup,
}))(applicatioVideo);

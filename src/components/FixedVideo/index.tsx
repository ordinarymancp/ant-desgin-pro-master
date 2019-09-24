import React from 'react';
// import styles from './index.scss';
import videojs from 'video.js/dist/video.js';
import 'videojs-flash';
import 'videojs-contrib-hls';
import 'video.js/dist/video-js.css';
class FixedVideo extends React.Component {
  // public player1: any;
  public timer: any;
  constructor(props) {
    super(props);
  }
  state = {
    zindex: 99,
    mousemoveState: true,
    globalClientY: 999,
  };
  componentWillUnmount() {
    if (this.player1) {
      this.player1.dispose();
    }
  }

  componentDidMount(): void {
    this.videoReload(
      'http://1300104663.vod2.myqcloud.com/85f6033avodcq1300104663/3634e7365285890793317258780/WoZ3aMAHBD4A.mp4',
      true,
    );
  }

  videoReload = (path: any, canplay: true) => {
    const videoFileStream = path;
    const options = {
      height: '90%',
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

  render() {
    return (
      <div
        style={{ position: 'fixed', width: '100%', height: '100%', zIndex: `${this.state.zindex}` }}
        onMouseMove={e => {
          if (this.state.mousemoveState) {
            this.setState({ globalClientY: e.clientY });
            if (e.clientY < 150) {
              this.setState({ zindex: 1 });
              return false;
            }
            if (e.clientY < this.state.globalClientY) {
              clearTimeout(this.timer);
              this.setState({ mousemoveState: false, zindex: 1 });
              setTimeout(() => {
                this.setState({ zindex: 99, mousemoveState: true });
              }, 3000);
              this.timer = setTimeout(() => {
                this.setState({ mousemoveState: true });
              }, 100);
            }
          }
        }}
      >
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
    );
  }
}
export default FixedVideo;

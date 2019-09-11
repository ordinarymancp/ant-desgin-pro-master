import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Tabs, Input, message } from 'antd';
import styles from './index.scss';
import router from 'umi/router';
const { TabPane } = Tabs;
const { Search } = Input;

// @ts-ignore
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class settings extends React.Component {
  state = {
    homeWelcomeFirst: '',
    homeWelcomeSecond: '',
    lastWelcomeFirst: '',
    lastWelcomeSecond: '',
    volume: 0,
    videoPath: '',
  };

  private homeWelcomeFirst: any;

  private homeWelcomeSecond: any;

  private lastWelcomeFirst: any;
  private lastWelcomeSecond: any;

  private volume: any;

  private videoPath: any;

  componentDidMount(): void {
    if (localStorage.getItem('settings')) {
      const settingsValue = JSON.parse(localStorage.getItem('settings') as string);
      const { homeWelcomeFirst, homeWelcomeSecond, lastWelcome, volume, videoPath } = settingsValue;
      if (JSON.stringify(this.state) !== JSON.stringify(settingsValue)) {
        this.setState({
          homeWelcomeFirst,
          homeWelcomeSecond,
          lastWelcome,
          volume,
          videoPath,
        });
      }
    } else {
      localStorage.setItem('settings', JSON.stringify(this.state));
    }
  }

  setSettings = (key: string | number, value: any) => {
    if (localStorage.getItem('settings')) {
      const settingValue = JSON.parse(localStorage.getItem('settings') as string);
      settingValue[key] = value;
      localStorage.setItem('settings', JSON.stringify(settingValue));
      message.success('设置成功');
    } else {
      // eslint-disable-next-line no-undef,max-len
      const settingsobj = {
        homeWelcomeFirst: this.homeWelcomeFirst,
        homeWelcomeSecond: this.homeWelcomeSecond,
        lastWelcomeSecond: this.lastWelcomeSecond,
        lastWelcomeFirst: this.lastWelcomeFirst,
        volume: this.volume,
        videoPath: this.videoPath,
      };
      localStorage.setItem('settings', JSON.stringify(settingsobj));
    }
  };

  gotoWelcomeIndex = () => {
    router.push('/index/welcomeIndex');
  };

  getVideoUrl = (e: { preventDefault: () => void }) => {
    // @ts-ignore
    const { dispatch } = this.props;
    // var reader = new FileReader();
    // var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
    // var file = e.target.files[0];
    // let imageFile = '';
    // var imgUrlBase64;
    function getObjectURL(file) {
      var url = null;
      if (window.createObjcectURL != undefined) {
        url = window.createOjcectURL(file);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }
    var objURL = getObjectURL(e.target.files[0]);//这里的objURL就是input file的真实路径
    console.log(objURL)
    // if (file) {
    //   //将文件以Data URL形式读入页面
    //   imgUrlBase64 = reader.readAsDataURL(file);
    //   reader.onload = function (e) {
    //     //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
    //     if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
    //       alert( '上传失败，请上传不大于2M的图片！');
    //       return;
    //     }else{
    //       //执行上传操作
    //       imageFile = reader.result;
          dispatch({
            type: 'global/fetchVideo',
            url: objURL,
          });
    //     }
    //   }
    // }
    // fetch('http://192.168.1.117:8810/api/v1/video/start',{
    //   method: 'POST',
    //   body: JSON.stringify({ account: 'rtsp://localhost:8554/' }),
    // }).then(function(res){ console.log(res) })
    //   .catch(function(res){ console.log(res) })
    // console.log(request('http://192.168.1.117:8810/api/v1/video/start', {
    //   method: 'POST',
    //   body: JSON.stringify({ account: 'rtsp://localhost:8554/' }),
    // }).then(res => {console.log(res)}))

    // const windowURL = window.URL || window.webkitURL;
    // const fileObj = e.target.files;
    // console.log(fileObj)
    // // if (fileObj.type.indexOf('video') === -1){
    // //   return false;
    // // }
    // if (localStorage.getItem('settings')) {
    //   const settingValue = JSON.parse(localStorage.getItem('settings'));
    //   console.log(JSON.stringify(fileObj))
    //   settingValue['videoPath'] = JSON.stringify(fileObj);
    //   localStorage.setItem('settings', JSON.stringify(settingValue))
    // } else {
    //   const settingsobj = { homeWelcome, lastWelcome, volume, videoPath };
    //   localStorage.setItem('settings', JSON.stringify(settingsobj))
    // }
  };

  gotoIndex = () => {
    router.push('/index');
  };

  render() {
    return (
      <div className="overview" style={{ padding: '20px' }}>
        <span className={styles.gotoIndex} onClick={this.gotoIndex}>
          前往主页
        </span>
        <Tabs tabPosition="left" style={{ height: 220, color: 'rgba(255, 255, 255, 0.65)' }}>
          <TabPane tab="首页编辑" key="首页编辑">
            <div style={{ width: '80%', marginLeft: '10%' }}>
              <div style={{ marginBottom: '20px' }}>
                首页欢迎词编辑{' '}
                <span className={styles.gotoWelcome} onClick={this.gotoWelcomeIndex}>
                  前往欢迎页
                </span>
              </div>
              <div>
                <div style={{ margin: '0 20px 20px 0', float: 'left' }}>首行</div>
                <Search
                  placeholder="请输入首行欢迎词"
                  enterButton="保存"
                  value={this.state.homeWelcomeFirst}
                  style={{ width: '50%' }}
                  onChange={event => {
                    this.setState({
                      homeWelcomeFirst: event.target.value,
                    });
                  }}
                  onSearch={value => this.setSettings('homeWelcomeFirst', value)}
                />
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{ margin: '0 20px 20px 0', float: 'left' }}>次行</div>
                <Search
                  placeholder="请输入次行欢迎词"
                  enterButton="保存"
                  value={this.state.homeWelcomeSecond}
                  style={{ width: '50%' }}
                  onChange={event => {
                    this.setState({
                      homeWelcomeSecond: event.target.value,
                    });
                  }}
                  onSearch={value => this.setSettings('homeWelcomeSecond', value)}
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab="尾页编辑" key="尾页编辑">
            <div style={{ width: '80%', marginLeft: '10%' }}>
              <div style={{ marginBottom: '20px' }}>尾页欢迎词编辑</div>
              {/*<Search*/}
              {/*  placeholder="请输入尾页欢迎词"*/}
              {/*  enterButton="保存"*/}
              {/*  value={this.state.lastWelcome}*/}
              {/*  style={{ width: '50%' }}*/}
              {/*  onChange={event => {*/}
              {/*    this.setState({*/}
              {/*      lastWelcome: event.target.value,*/}
              {/*    });*/}
              {/*  }}*/}
              {/*/!*  onSearch={value => this.setSettings('lastWelcome', value)}*!//>*/}
              <div>
                <div style={{ margin: '0 20px 20px 0', float: 'left' }}>首行</div>
                <Search
                  placeholder="请输入首行结束词"
                  enterButton="保存"
                  value={this.state.lastWelcomeFirst}
                  style={{ width: '50%' }}
                  onChange={event => {
                    this.setState({
                      lastWelcomeFirst: event.target.value,
                    });
                  }}
                  onSearch={value => this.setSettings('lastWelcomeFirst', value)}
                />
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{ margin: '0 20px 20px 0', float: 'left' }}>次行</div>
                <Search
                  placeholder="请输入次行结束词"
                  enterButton="保存"
                  value={this.state.lastWelcomeSecond}
                  style={{ width: '50%' }}
                  onChange={event => {
                    this.setState({
                      lastWelcomeSecond: event.target.value,
                    });
                  }}
                  onSearch={value => this.setSettings('lastWelcomeSecond', value)}
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab="音量编辑" key="音量编辑">
            <div style={{ width: '80%', marginLeft: '10%' }}>音量编辑</div>
          </TabPane>
          <TabPane tab="宣传视频编辑" key="宣传视频编辑">
            <div style={{ width: '80%', marginLeft: '10%' }}>
              <div style={{ marginBottom: '20px' }}>宣传视频编辑</div>
              <input type="file" onChange={this.getVideoUrl.bind(this)} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({}))(settings);


import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import {Tabs, Input, message} from 'antd';

const { TabPane } = Tabs;
const { Search } = Input;


// @ts-ignore
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class settings extends React.Component {
  state = {
    homeWelcome: '',
    lastWelcome: '',
    volume: 0,
    videoPath: '',
  };

  private homeWelcome: any;

  private lastWelcome: any;

  private volume: any;

  private videoPath: any;

  componentDidMount(): void {
    if (localStorage.getItem('settings')) {
        const settingsValue = JSON.parse(localStorage.getItem('settings') as string);
      const { homeWelcome, lastWelcome, volume, videoPath } = settingsValue;
      if (JSON.stringify(this.state) !== JSON.stringify(settingsValue)) {
        this.setState({
          homeWelcome, lastWelcome, volume, videoPath,
        })
      }
    } else {
      localStorage.setItem('settings', JSON.stringify(this.state))
    }
  }

  setSettings = (key: string | number, value: any) => {
    console.log(value, key)
    if (localStorage.getItem('settings')) {
      const settingValue = JSON.parse(localStorage.getItem('settings') as string);
      settingValue[key] = value;
      localStorage.setItem('settings', JSON.stringify(settingValue));
      message.success('设置成功')
    } else {
      // eslint-disable-next-line no-undef,max-len
      const settingsobj = { homeWelcome: this.homeWelcome, lastWelcome: this.lastWelcome, volume: this.volume, videoPath: this.videoPath };
      localStorage.setItem('settings', JSON.stringify(settingsobj))
    }
  }

  getVideoUrl = (e: { preventDefault: () => void; }) => {
   // @ts-ignore
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchVideo',
    });
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
  }

  render() {
    return (
      <div className= "overview">
        <Tabs tabPosition ="left" style={{ height: 220, color:'rgba(255, 255, 255, 0.65)' }}>
          <TabPane tab="首页编辑" key="首页编辑" >
            <div style={{ width: '80%', marginLeft: '10%' }}>
              <div style={{ marginBottom: '20px' }}>首页欢迎词编辑</div>
              <Search
                placeholder="请输入首页欢迎词"
                enterButton="保存"
                value={this.state.homeWelcome}
                onChange={(event) => {
                  this.setState({
                    homeWelcome: event.target.value,
                  })
                }}
                onSearch={value => this.setSettings('homeWelcome', value)}
              />
            </div>
          </TabPane>
          <TabPane tab="尾页编辑" key="尾页编辑">
            <div style={{ width: '80%', marginLeft: '10%' }}>
              <div style={{ marginBottom: '20px' }}>尾页欢迎词编辑</div>
              <Search
                placeholder="请输入尾页欢迎词"
                enterButton="保存"
                value={this.state.lastWelcome}
                onChange={(event) => {
                  this.setState({
                    lastWelcome: event.target.value,
                  })
                }}
                onSearch={value => this.setSettings('lastWelcome', value)}
              />
            </div>
          </TabPane>
          <TabPane tab="音量编辑" key="音量编辑">
            <div style={{ width: '80%', marginLeft: '10%' }}>
              音量编辑
            </div>
          </TabPane>
          <TabPane tab="宣传视频编辑" key="宣传视频编辑">
            <div style={{ width: '80%', marginLeft: '10%' }}>
              <div style={{ marginBottom: '20px' }}>宣传视频编辑</div>
              <input type="file" onChange={this.getVideoUrl.bind(this)}/>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({

}))(settings);

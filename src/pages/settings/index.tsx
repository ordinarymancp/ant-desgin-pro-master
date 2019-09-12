import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Tabs, Input, message } from 'antd';
import styles from './index.scss';
import router from 'umi/router';
import $ from '../../../public/js/jquery-1.10.2.min';
import SparkMD5 from '../../../public/js/spark-md5.min';
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
    baseUrl: 'http://localhost:8000',
    chunkSize: 5 * 1024 * 1024,
    fileSize: 0,
    file: null,
    hasUploaded: 0,
    chunks: 0,
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
    this.setState(
      {
        file: e.target.files[0],
        fileSize: e.target.files[0].size,
      },
      () => {
        this.responseChange(this.state.file);
      },
    );

    // var reader = new FileReader();
    // var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
    // var file = e.target.files[0];
    // let imageFile = '';
    // var imgUrlBase64;
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

  // 0.响应点击
  responseChange = async file => {
    // 第一步：按照 修改时间+文件名称+最后修改时间-->MD5
    // 显示文件校验进度
    $('#process1').slideDown(200);
    // 开始校验
    let fileMd5Value = await this.md5File(file);
    // 第二步：校验文件的MD5
    let result = await this.checkFileMD5(file.name, fileMd5Value);
    // 如果文件已存在, 就秒传
    if (result.file) {
      alert('文件已秒传');
      return;
    }
    // let exit = false
    // 显示文件上传进度
    $('#process2').slideDown(200);
    // 第三步：检查并上传MD5
    await this.checkAndUploadChunk(fileMd5Value, result.chunkList);
    // 第四步: 通知服务器所有分片已上传完成
    this.notifyServer(fileMd5Value);
  };

  // 1.修改时间+文件名称+最后修改时间-->MD5
  md5File = file => {
    return new Promise((resolve, reject) => {
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        //chunkSize = 2097152, // Read in chunks of 2MB
        chunkSize = file.size / 100,
        //chunks = Math.ceil(file.size / chunkSize),
        chunks = 100,
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader();

      fileReader.onload = function(e) {
        console.log('read chunk nr', currentChunk + 1, 'of', chunks);
        spark.append(e.target.result); // Append array buffer
        currentChunk++;

        if (currentChunk < chunks) {
          loadNext();
        } else {
          let cur = +new Date();
          console.log('finished loading');
          // alert(spark.end() + '---' + (cur - pre)); // Compute hash
          let result = spark.end();
          resolve(result);
        }
      };

      fileReader.onerror = () => {
        console.warn('oops, something went wrong.');
      };

      function loadNext() {
        var start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        console.log(start, end);
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        $('#checkProcessStyle').css({
          width: currentChunk + 1 + '%',
        });
        $('#checkProcessValue').html(currentChunk + 1 + '%');
        // $("#tip").html(currentChunk)
      }

      loadNext();
    });
  };
  // 2.校验文件的MD5
  checkFileMD5 = (fileName, fileMd5Value) => {
    const { baseUrl } = this.state;
    return new Promise((resolve, reject) => {
      let url = baseUrl + '/check/file?fileName=' + fileName + '&fileMd5Value=' + fileMd5Value;
      $.getJSON(url, function(data) {
        resolve(data);
      });
    });
  };
  // 3.上传chunk
  checkAndUploadChunk = async (fileMd5Value, chunkList) => {
    const { chunks, chunkSize, hasUploaded, fileSize } = this.state;
    this.setState(
      {
        chunks: Math.ceil(fileSize / chunkSize),
        hasUploaded: chunkList.length,
      },
      async () => {
        for (let i = 0; i < chunks; i++) {
          let exit = chunkList.indexOf(i + '') > -1;
          // 如果已经存在, 则不用再上传当前块
          if (!exit) {
            let index = await this.upload(i, fileMd5Value, chunks);
            this.setState({ hasUploaded: hasUploaded++ });
            let radio = Math.floor((hasUploaded / chunks) * 100);
            $('#uploadProcessStyle').css({
              width: radio + '%',
            });
            $('#uploadProcessValue').html(radio + '%');
          }
        }
      },
    );
  };

  // 3-2. 上传chunk
  upload = (i, fileMd5Value, chunks) => {
    const { baseUrl, chunkSize, hasUploaded, fileSize, file } = this.state;
    return new Promise((resolve, reject) => {
      //构造一个表单，FormData是HTML5新增的
      let end = (i + 1) * chunkSize >= file.size ? file.size : (i + 1) * chunkSize;
      let form = new FormData();
      form.append('data', file.slice(i * chunkSize, end)); //file对象的slice方法用于切出文件的一部分
      form.append('total', chunks); //总片数
      form.append('index', i); //当前是第几片
      form.append('fileMd5Value', fileMd5Value);
      $.ajax({
        url: baseUrl + '/upload',
        type: 'POST',
        data: form, //刚刚构建的form数据对象
        async: true, //异步
        processData: false, //很重要，告诉jquery不要对form进行处理
        contentType: false, //很重要，指定为false才能形成正确的Content-Type
        success: function(data) {
          resolve(data.desc);
        },
      });
    });
  };

  // 第四步: 通知服务器所有分片已上传完成
  notifyServer = fileMd5Value => {
    const { baseUrl, chunks, chunkSize, hasUploaded, fileSize, file } = this.state;
    let url =
      baseUrl + '/merge?md5=' + fileMd5Value + '&fileName=' + file.name + '&size=' + file.size;
    $.getJSON(url, function(data) {
      alert('上传成功');
    });
  };

  getDate = () => {
    let d = new Date();
    return d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getMilliseconds();
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

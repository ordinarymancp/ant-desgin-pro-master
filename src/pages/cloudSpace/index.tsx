import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import {Tabs, Button, Modal, Form, Input, List, Empty, Icon} from 'antd';
import videojs from 'video.js/dist/video.js';
import 'videojs-flash';
import 'videojs-contrib-hls';
import 'video.js/dist/video-js.css';
import styles from '@/pages/settings/index.scss';
import router from 'umi/router';
import $ from '../../../public/js/jquery-1.10.2.min';
import SparkMD5 from '../../../public/js/spark-md5.min';
import PDF from 'react-pdf-js';

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
    const { baseUrl } = this.state
    this.setState({
      loadinghidden: true
    })
    if (localStorage.getItem('cloudSpace')) {
      // eslint-disable-next-line no-shadow
      const { cloudSpace } = JSON.parse(localStorage.getItem('cloudSpace') as string);
      const { videoList, imageList, musicList, textList } = cloudSpace;
      this.setState({ videoList, imageList, musicList, textList });
    } else {
      localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace: this.state }));
    }
    $.ajax({
      url: baseUrl + '/findVideo',
      type: 'POST',
      data: '', //刚刚构建的form数据对象
      async: true, //异步
      success: (data) => {
        const successArr = data.filter(item => {
          return item.indexOf('mp4') !== -1
        })
        this.setState({
          videoList: successArr
        },() => {
          localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace: this.state }));
        })
      },
      error: () => {
        this.setState({
          videoList: [],
        },() => {
          localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace: this.state }));
        })
      },
    });
    $.ajax({
      url: baseUrl + '/findPdf',
      type: 'POST',
      data: '',
      async: true,
      success: (data) => {
        const successArr = data.filter(item => {
          return item.indexOf('pdf') !== -1
        })
        this.setState({
          textList: successArr,
        },() => {
          localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace: this.state }));
        })
      },
      error: () => {
        this.setState({
          textList: [],
        },() => {
          localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace: this.state }));
        })
      },
    });
    $.ajax({
      url: baseUrl + '/findImage',
      type: 'POST',
      data: '', //刚刚构建的form数据对象
      async: true, //异步
      success: (data) => {
        const successArr = data.filter(item => {
          return item.indexOf('jpg') !== -1
        })
        this.setState({
          imageList: successArr
        },() => {
          localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace: this.state }));
        })
      },
      error: () => {
        this.setState({
         imageList: [],
        },() => {
          localStorage.setItem('cloudSpace', JSON.stringify({ cloudSpace: this.state }));
        })
      },
    });
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
    baseUrl: 'http://192.168.1.102:3000',
    chunkSize: 5 * 1024 * 1024,
    fileSize: 0,
    file: null,
    hasUploaded: 0,
    chunks: 0,
    loadinghidden: true,
    checkedVideo: '',
    checkedPdf: '',
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

  deleteCloudPdf = (index: any) => {
    const { textList, baseUrl } = this.state;
    // eslint-disable-next-line no-shadow
    // @ts-ignore
    $.ajax({
      url: baseUrl + '/deletePdf?name='+ textList[index],
      type: 'GET',
      async: true,
      success: (data) => {
        textList.splice(index ,1)
        this.setState(textList)
      },
    });
  };

  deleteCloudImage = (index: any) => {
    const { imageList, baseUrl } = this.state;
    // eslint-disable-next-line no-shadow
    // @ts-ignore
    $.ajax({
      url: baseUrl + '/deleteImage?name='+ imageList[index],
      type: 'GET',
      async: true, //异步
      success: (data) => {
        imageList.splice(index,1)
        this.setState(imageList)
      },
    });
  };

  // 删除云视频
  deleteCloudVideo = (index: any) => {
    const { videoList, baseUrl } = this.state;
    // eslint-disable-next-line no-shadow
    // @ts-ignore
    $.ajax({
      url: `${baseUrl}/deleteVideo?name=${videoList[index]}`,
      type: 'GET',
      data: videoList[index],
      async: true,
      success: () => {
        videoList.splice(index, 1)
        this.setState(videoList)
      },
    });
  };
  openPdf = (index) => {
    const { textList } = this.state;
    window.open("http://192.168.1.102:3000/pdf?name=" + textList[index])
  }
  videoReload = (path: any) => {
    const { baseUrl } = this.state
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
      src: `${baseUrl}video?name=${videoFileStream}`,
    });
    this.player1.load();
    this.player1.play();
  };

  handleVideoCancel = () => {
    this.setState({ viedoModelVisible: false });
  };

  handleVideoOk = () => {
    this.setState({ viedoModelVisible: false });
  };
  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious} style={{position: 'absolute', left: '20px', top: '48%', opacity: '0.4'}}><Icon type="left-circle" style={{fontSize: '35px'}} /></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled" style={{position: 'absolute', left: '20px', top: '48%', opacity: '0.4'}}><Icon type="left-circle" style={{fontSize: '35px'}}/></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext} style={{position: 'absolute', right: '20px', top: '48%', opacity: '0.4'}}><Icon type="right-circle" style={{fontSize: '35px'}}/></li>;
    if (page === pages) {
      nextButton = <li className="next disabled" style={{position: 'absolute', right: '20px', top: '48%', opacity: '0.4'}}><Icon type="right-circle" style={{fontSize: '35px'}}/></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }
  handlePrevious = () => {
    this.setState({ page: this.state.page - 2 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 2 });
  }
  gotoIndex = () => {
    router.push('/index');
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
        console.log(this.state.file);
        this.setState({loadinghidden: false})
        this.responseChange(this.state.file);
      },
    );
  };

  // 0.响应点击
  responseChange = async (file: { name: any; }) => {
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
      this.componentDidMount()
      return;
    }
    // let exit = false
    // 显示文件上传进度
    $('#process2').slideDown(200);
    // 第三步：检查并上传MD5
    await this.checkAndUploadChunk(fileMd5Value, result.chunkList);
    // 第四步: 通知服务器所有分片已上传完成
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
        console.log(data);
        resolve(data);
      });
    });
  };
  // 3.上传chunk
  checkAndUploadChunk = async (fileMd5Value, chunkList) => {
    let hasUploaded = 0;
    console.log('_________checkAndUploadChunk!!!');
    const { chunks, chunkSize, fileSize } = this.state;
    console.log(fileSize, chunkSize);
    (hasUploaded = chunkList.length),
      this.setState(
        {
          chunks: Math.ceil(fileSize / chunkSize),
        },
        async () => {
          const { chunks, chunkSize, fileSize } = this.state;
          console.log(chunks);
          for (let i = 0; i < chunks; i++) {
            let exit = chunkList.indexOf(i + '') > -1;
            // 如果已经存在, 则不用再上传当前块
            if (!exit) {
              let index = await this.upload(i, fileMd5Value, chunks);
              hasUploaded++;
              let radio = Math.floor((hasUploaded / chunks) * 100);
              $('#uploadProcessStyle').css({
                width: radio + '%',
              });
              $('#uploadProcessValue').html(radio + '%');
            }
          }
          this.notifyServer(fileMd5Value);
          this.componentDidMount()
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
        data: form, //刚刚构建的form数据对象,
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

  render() {
    const { videoList, viedoModelVisible, imageList, loadinghidden, textList, checkedPdf, baseUrl } = this.state;
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div className="overview">
        <div className="container" style={{color: 'rgba(255, 255, 255, 0.65)', position: 'fixed',width: '40%',height: '40%',left: '0', right: '0', top: '0', bottom: '0',zIndex: '999', margin: 'auto', background: 'black'}} hidden={loadinghidden}>
          <div className="row" id="process1" style={{ display: 'none' }}>
            <div className="col-md-4">校验文件进度</div>
            <div className="col-md-8">
              <div className="progress">
                <div
                  id="checkProcessStyle"
                  className="progress-bar"
                  style={{ width: '0%' }}
                />
                <p id="checkProcessValue" className="value">
                  0%
                </p>
              </div>
            </div>
          </div>
          <div className="row" id="process2" style={{ display: 'none' }}>
            <div className="col-md-4">上传文件进度</div>
            <div className="col-md-8">
              <div className="progress">
                <div
                  id="uploadProcessStyle"
                  className="progress-bar"
                  style={{ width: '0%' }}
                />
                <p id="uploadProcessValue" className="value">
                  0%
                </p>
              </div>
            </div>
          </div>
        </div>
        <span className={styles.gotoIndex} onClick={this.gotoIndex}>
          前往主页
        </span>
        {/*<Modal*/}
        {/*  visible={viedoModelVisible}*/}
        {/*  title="pdf预览"*/}
        {/*  onCancel={this.handleVideoCancel}*/}
        {/*  onOk={this.handleVideoOk}*/}
        {/*>*/}
        {/*  <PDF*/}
        {/*    style={{width: '100%', height: '50%'}}*/}
        {/*    file={"http://192.168.1.102:3000/pdf?name=云班牌解决方案(2).pdf"}*/}
        {/*    onDocumentComplete={this.onDocumentComplete}*/}
        {/*    page={this.state.page+1}*/}
        {/*  />*/}
        {/*</Modal>*/}
        <Tabs tabPosition="left" style={{ height: '100%', color: 'rgba(255, 255, 255, 0.65)' }}>
          <TabPane tab="视频" key="视频">
            <input type="file" onChange={this.getVideoUrl.bind(this)} />
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
                      <a key="list-loadmore-edit" onClick={this.deleteCloudVideo.bind(this, index)}>
                        删除
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      title={<h4 style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{item}</h4>}
                      description={
                        <h4 style={{ color: 'rgba(255, 255, 255, 0.65)' }}>视频地址:{item}</h4>
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
            <input type="file" onChange={this.getVideoUrl.bind(this)} />

            {imageList.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={textList}
                style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <a key="list-loadmore-edit" onClick={this.deleteCloudPdf.bind(this, index)}>
                        删除
                      </a>,
                      <a key="list-loadmore-edit" onClick={this.openPdf.bind(this, index)}>
                        预览
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      title={<h4 style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{item}</h4>}
                      style={{ color: 'rgba(255, 255, 255, 0.65) !important' }}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty />
            )}
          </TabPane>
          <TabPane tab="图片" key="图片">
            <input type="file" onChange={this.getVideoUrl.bind(this)} />

            {imageList.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={imageList}
                style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <a key="list-loadmore-edit" onClick={this.deleteCloudImage.bind(this, index)}>
                        删除
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      title={<h4 style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{item}</h4>}
                      description={
                        <img src= {`http://192.168.1.102:3000/image?name=${item}`} alt="" style={{width: '100px', height: '60px'}}/>
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
          <TabPane tab="音频" key="音频">
            <Empty />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({}))(cloudSpace);

import React from 'react';
import { connect } from 'dva';
import s from './index.scss'
import imgs from '@/assets/66.jpg'
import example1 from '@/assets/wisdomEducation/example1.jpg'
import example3 from '@/assets/wisdomEducation/example3.jpg'
import example4 from '@/assets/wisdomEducation/example4.jpg'

// import Zmage from 'react-zmage'
import {
  Form,
  Button,
  Input,
  Card,
  DatePicker,
  Tabs, message,
} from 'antd';
import styles from '@/pages/applicatioScenarioContent/index.scss';
import MenuItem from '@/components/MenuItem';
import router from 'umi/router';
const FormItem = Form.Item;
const Password = Input.Password;
const { TabPane } = Tabs;
/* eslint react/no-multi-comp:0 */
@connect(({ demorr }) => ({
    demorr
}))
@Form.create()
class Addpeople extends React.Component {
    state = {
      scrollTop: 0,
      timer: true,
      tabGroupA: [],
      GroupAChecked: 0,
      tabGroupB: [],
      GroupBChecked: 0,
      hiddenState: true,
      content: '',
      activeIndex: 1,
      coverHidden: true,
      imagePath: '',
      info: '',
      managerA: '',
      managerB: '',
      manage: true,
      topImage: '',
      pos: false,
    };

    componentDidMount() {
      const { match } = this.props;
      this.setState({ content: match.params.name });
      window.addEventListener('scroll', this.bindHandleScroll)
      document.onkeydown = (e) => {
        if(e.keyCode === 38){
          this.goPre()
        }else if(e.keyCode === 40){
          this.goNext()
        }
      }
      const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup'));
      solutionGroup.forEach(item => {
        item.solutionSonGroup.forEach(items => {
          if (items.name === match.params.name) {
            this.setState({
              tabGroupA: items.tabGroupA,
              tabGroupB: items.tabGroupB,
              imagePath: items.imagePath,
              info: items.info,
              managerB: items.managerB || '',
              managerA: items.managerA || '',
              manage: !(items.manage === false),
              topImage: items.topImage,
              pos: !!items.pos,
            });
          }
        });
      });
    }

    bindHandleScroll = (event)=>{
      // 滚动的高度
      if(this.state.timer){
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
          || window.pageYOffset
          || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        // 判断用户当前是否进行了横向滚动，如果用户发生了横向滚动，则设置元素为static
        const scrollLeft = (event.srcElement ? event.srcElement.documentElement.scrollLeft : false)
          || window.pageXOffset
          || (event.srcElement ? event.srcElement.body.scrollLeft : 0);
        this.setState({
          // timer: false,
          scrollTop: scrollTop,
        })
        // setTimeout(() => {
        //   this.setState({
        //     timer: true,
        //   })
        // },30)
      }
    }

    //在componentWillUnmount，进行scroll事件的注销
    componentWillUnmount(){
      window.removeEventListener('scroll', this.bindHandleScroll);
      document.onkeydown = null
    }

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
            if(item.solutionSonGroup[index + 1].gotoContent){
              router.push('/wit/' + item.solutionSonGroup[index + 1].name);
            } else if(item.solutionSonGroup[index + 1].url) {
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
            message.warning('这是最后一个场景');
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
            console.log(item.solutionSonGroup[index - 1])
            if(item.solutionSonGroup[index - 1].gotoContent){
              router.push('/wit/' + item.solutionSonGroup[index + 1].name);
            } else if(item.solutionSonGroup[index - 1].url) {
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

    render() {
      const { pos, manage, topImage, tabGroupA, GroupAChecked, tabGroupB, GroupBChecked, hiddenState, activeIndex, coverHidden, imagePath, info, managerB, managerA } = this.state;
      console.log(pos)
      return (
            <div style={{width: '100%', height: '100%', background: 'white'}}>
              <div style={{position: 'fixed', height: '100%', width: '100%',background: 'rgba(0,0,0,0.2)', zIndex: '999'}} hidden={coverHidden} onClick={() => {this.setState({coverHidden: true})}}>
                <img src={imagePath !== '' ? require(`../../../src/assets/${imagePath}/ppt${activeIndex}.jpg`) : ''} style={!pos ? { position: 'absolute', margin: 'auto', left: '0', right: '0', top: '0', bottom: '0', width: '960px', height: '540px'} : { position: 'absolute', margin: 'auto', left: '0', right: '0', top: '0', bottom: '0', width: '920px', height: '690px'}}/>
              </div>
              <div
                style={{ position: 'fixed', height: '100%', width: '3%', right: 0, zIndex: '999' }}
                onMouseOver={this.movein}
                onMouseOut={this.moveout}
              >
                <div
                  style={{ width: '30%', height: '100%', background: 'rgba(0,0,0,0.3)', float: 'right' }}
                >
                  <div
                    hidden={hiddenState}
                    style={{
                      height: '47%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'fixed',
                      right: '0',
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
                <header style={{ position: 'relative' }}>
                  <img src={topImage ? topImage : 'https://img.alicdn.com/tfs/TB1RR6rz6TpK1RjSZKPXXa3UpXa-1920-648.jpg'} alt="" style={{ width: '100%', height: 500, zIndex: '-1', transform: `matrix(1, 0, 0, 1, 0, ${this.state.scrollTop * 0.6})` }} />
                  <div className={s.titleContent}>{this.props.match.params.name}解决方案</div>
                  <div className={s.bt}>
                        <span>咨询我们</span>
                    </div>
                </header>
                <nav style={ {position: 'relative', background: 'white', zIndex: '3', width: '100%'}}>
                    <ul className={s.nav}>
                        <li><a href="#overviews" style={{fontWeight: 800}}>概述</a></li>
                        <li><a href="#product" style={{fontWeight: 800}}>总体架构</a></li>
                        <li><a href="#introduction" style={{fontWeight: 800}}>方案介绍</a></li>
                        <li><a href="#manage" style={{fontWeight: 800}}>运营管理</a></li>
                        <li><a href="#example" style={{fontWeight: 800}}>应用案例</a></li>
                    </ul>
                </nav>
              {this.state.scrollTop > 500 ? <nav style={{position: 'fixed', background: 'white', top: '0px', zIndex: 99,width: '100%'}}>
                <ul className={s.nav}>
                  <li><a href="#overviews" style={{fontWeight: 800}}>概述</a></li>
                  <li><a href="#product" style={{fontWeight: 800}}>总体架构</a></li>
                  <li><a href="#introduction" style={{fontWeight: 800}}>方案介绍</a></li>
                  <li><a href="#manage" style={{fontWeight: 800}}>运营管理</a></li>
                  <li><a href="#example" style={{fontWeight: 800}}>应用案例</a></li>
                </ul>
              </nav>: ''}
                <div id="overviews" className={s.content} style={{ zIndex: '3', position: 'relative', background: 'white'}}>
                    {/* 教育建设 */}
                    <div className={s.wit}>
                        <h1 className={s.tit}>{this.props.match.params.name}建设内容</h1>
                        <div className={s.witcontent}>
                          {info}
                        </div>
                    </div>
                    {/* 总体架构 */}
                    <div id="product" className={s.wit}>
                        <h1 className={s.tit}>总体架构</h1>
                        <div className={s.witcontent}>
                            <div className={s.titnav}>
                              <img src={imagePath !== '' ? require(`../../../src/assets/${imagePath}/example1.jpg`) : ''} alt="" style={{width: '95%', height: '700px', margin: '0 auto'}}/>
                            </div>
                        </div>
                    </div>
                    {/* 方案介绍 */}
                    <div className={s.wit} id="introduction">
                        <h1 className={s.tit}>方案介绍</h1>
                        <div className={s.witcontent}>
                            <div style={{width: '100%'}} className={s.tabContent}>
                              <div className={s.tabLeft} style={!pos ? {height: '450px'} : {}}>
                                {
                                  tabGroupA.map((item,index) => {
                                    return <div className={`${s.tabItem} ${GroupAChecked === index ? s.tabItemActive : ''}`} style={{height: `${(!pos ? 450 : 600) / tabGroupA.length}px`,lineHeight: `${(!pos ? 450 : 600) / tabGroupA.length}px`}} onClick={() => {this.setState({GroupAChecked: index})}}>{item}</div>
                                  })
                                }
                              </div>
                              <div className={s.tabRight} style={!pos ? {height: '450px'} : {}}>
                                <img src={imagePath !== '' ? require(`../../../src/assets/${imagePath}/ppt${GroupAChecked + 1}.jpg`) : ''} alt="" style={!pos ? {width: '800px', height: '450px'} : {width: '800px', height: '600px'}} onClick={() => {this.setState({coverHidden: false, activeIndex: GroupAChecked + 1})}}/>
                              </div>
                            </div>
                        </div>
                    </div>
                    {/* 运营管理 */}
                  {
                    manage ?  <div className={s.wit} id="manage">
                      <h1 className={s.tit}>运营管理</h1>
                      <div className={s.witcontent}>
                        <div style={{ paddingLeft: 15, paddingRight: 15, }}>
                          <p style={{ marginTop: 20, fontSize: 18 }}>{managerA}</p>
                          <p style={{ marginTop: 15, fontSize: 18, fontWeight: 700 }}>{managerB}</p>
                          <div className={s.tab}>
                            <div className={!pos ? s.tabsons : s.tabson}>
                              <div className={s.tabCon}>
                                <img src={imagePath !== '' ? require(`../../../src/assets/${imagePath}/example3.jpg`) : ''} alt="" style={{width: '100%', height: '100%', textIndent: '0'}}/>
                              </div>
                            </div>
                            <div className={!pos ? s.tabsons : s.tabson}>
                              <div className={s.tabCon}>
                                <img src={imagePath !== '' ? require(`../../../src/assets/${imagePath}/example4.jpg`) : ''} alt="" style={{width: '100%', height: '100%', textIndent: '0'}}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> : ''
                  }
                    {/* 应用案例 */}
                  {tabGroupB.length > 0 ?  <div className={s.wit} id="example">
                    <h1 className={s.tit}>应用案例</h1>
                    <div className={s.witcontent}>
                      <div style={{width: '100%'}} className={s.tabContent}>
                        <div className={s.tabLeft} style={!pos ? {height: '450px'} : {}}>
                          {
                            tabGroupB.map((item,index) => {
                              return <div className={`${s.tabItem} ${GroupBChecked === index ? s.tabItemActive : ''}`} style={{height: `${(!pos ? 450 : 600) / tabGroupB.length}px`, lineHeight: `${(!pos ? 450 : 600) / tabGroupB.length}px`}} onClick={() => {this.setState({GroupBChecked: index})}}>{item}</div>
                            })
                          }
                        </div>
                        <div className={s.tabRight} style={!pos ? {height: '450px'} : {}}>
                          <img src={imagePath !== '' ? require(`../../../src/assets/${imagePath}/ppt${GroupBChecked + tabGroupA.length + 1 }.jpg`) : ''} alt="" style={!pos ? {width: '800px', height: '450px'} : {width: '800px', height: '600px'}} onClick={() => {this.setState({coverHidden: false, activeIndex: GroupBChecked + tabGroupA.length + 1})}}/>
                        </div>
                      </div>
                    </div>
                  </div> : ''}
                </div>
                <footer style={{position:'relative'}}>
                <img src="https://img.alicdn.com/tfs/TB1BRbTz4jaK1RjSZKzXXXVwXXa-1920-292.jpg" alt="" style={{ width: '100%', height: 200 }} />
                <div className={s.footer}>
                        <div>咨询我们</div>
                    </div>
                </footer>
            </div>
        );
    }
}
export default Addpeople;

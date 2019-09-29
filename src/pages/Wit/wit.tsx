import React from 'react';
import { connect } from 'dva';
import s from './index.scss'
import imgs from '@/assets/66.jpg'
import example1 from '@/assets/example1.png'
import example2 from '@/assets/example2.png'
import example3 from '@/assets/example3.png'
import example4 from '@/assets/example4.png'
import example5 from '@/assets/example5.png'

// import Zmage from 'react-zmage'
import {
    Form,
    Button,
    Input,
    Card,
    DatePicker,
    Tabs
} from 'antd';
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
      tabGroupA: ['教育云-支持服务运营中心', '教育公共服务管理平台', '教育云资源平台', '人人通网络学习空间平台', '云课堂教学服务平台', '校园综合管理平台'],
      GroupAChecked: 0,
      tabGroupB: ['张家口教育云一期', '泾川县教育公共服务平台', '基础教育资源公共平台'],
      GroupBChecked: 0,
    };

    componentDidMount() {
      window.addEventListener('scroll', this.bindHandleScroll)
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
        console.log(scrollTop)
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
    }

    render() {
      const { tabGroupA, GroupAChecked, tabGroupB, GroupBChecked } = this.state;
        return (
            <div style={{width: '100%', height: '100%', background: 'white'}}>
                <header style={{ position: 'relative' }}>
                  <img src="https://img.alicdn.com/tfs/TB1D3N3gKSSBuNjy0FlXXbBpVXa-1920-648.jpg" alt="" style={{ width: '100%', height: 500, zIndex: '-1', transform: `matrix(1, 0, 0, 1, 0, ${this.state.scrollTop * 0.6})` }} />
                    <div className={s.bt}>
                        <span>咨询我们</span>
                    </div>
                </header>
                <nav style={ {position: 'relative', background: 'white', zIndex: '3', width: '100%'}}>
                    <ul className={s.nav}>
                        <li><a href="#overviews">概述</a></li>
                        <li><a href="#product">产品架构</a></li>
                        <li><a href="#introduction">方案介绍</a></li>
                        <li><a href="#manage">运营管理</a></li>
                        <li><a href="#example">应用案例</a></li>
                    </ul>
                </nav>
              {this.state.scrollTop > 500 ? <nav style={{position: 'fixed', background: 'white', top: '0px', zIndex: 99,width: '100%'}}>
                <ul className={s.nav}>
                  <li><a href="#overviews">概述</a></li>
                  <li><a href="#product">总体架构</a></li>
                  <li><a href="#introduction">方案介绍</a></li>
                  <li><a href="#manage">运营管理</a></li>
                  <li><a href="#example">应用案例</a></li>
                </ul>
              </nav>: ''}
                <div id="overviews" className={s.content} style={{ zIndex: '3', position: 'relative', background: 'white'}}>
                    {/* 教育建设 */}
                    <div className={s.wit}>
                        <h1 className={s.tit}>智慧教育建设内容</h1>
                        <div className={s.witcontent}>
                          智慧教育采用教育云的建设模式，包括“云”和“端”两部分。其中“云”主要包括1个云核心基础支撑平台、1个
                          支持运营服务中心、5个应用平台（分别为“人人通”平台、教育云资源平台、教育公共服务管理平台、云课堂教学服
                          务平台、校园综合管理服务平台）；“端”的建设主要是智慧学校应用环境，包括：视频监控系统、门禁一卡通系统、
                          信息发布系统、图书馆电子阅读系统、智慧教室、未来空间、多媒体互动教室、云桌面系统、WIFI覆盖等。
                        </div>
                    </div>
                    {/* 总体架构 */}
                    <div id="product" className={s.wit}>
                        <h1 className={s.tit}>总体架构</h1>
                        <div className={s.witcontent}>
                            <div className={s.titnav}>
                              <img src={example1} alt="" style={{width: '95%', height: '700px', margin: '0 auto'}}/>
                            </div>
                        </div>
                    </div>
                    {/* 方案介绍 */}
                    <div className={s.wit} id="introduction">
                        <h1 className={s.tit}>方案介绍</h1>
                        <div className={s.witcontent}>
                            <div style={{width: '100%'}} className={s.tabContent}>
                              <div className={s.tabLeft}>
                                {
                                  tabGroupA.map((item,index) => {
                                    return <div className={`${s.tabItem} ${GroupAChecked === index ? s.tabItemActive : ''}`} onClick={() => {this.setState({GroupAChecked: index})}}>{item}</div>
                                  })
                                }
                              </div>
                              <div className={s.tabRight}>
                                <img src={example2} alt="" style={{width: '100%', height: `${97 * 6}px`}}/>
                              </div>
                            </div>
                        </div>
                    </div>
                    {/* 运营管理 */}
                    <div className={s.wit} id="manage">
                        <h1 className={s.tit}>运营管理</h1>
                        <div className={s.witcontent}>
                            <div style={{ paddingLeft: 15, paddingRight: 15, }}>
                                <p style={{ marginTop: 20, fontSize: 18 }}>在建设好智慧教育系统的同时，通过高效的运营，既充分发挥出了智慧教育系统的优势，又为社会创造了经济效益和社会效益。
                                  通过教育云运营，切实发挥智慧教育系统的作用，扩大优质资源覆盖面，缩小城乡、重点学校和非重点学校之间的差别，加强教
                                  育管理，全面提高教育水平，实现教育部提出的教育信息化各项核心目标。</p>
                                <p style={{ marginTop: 15, fontSize: 18, fontWeight: 700 }}>智慧教育的运营分两种模式，基础服务运营和增值服务运营。这两种服务均由运营公司管理运营，运营公司的建立有多种模式，
                                  比如政府委托第三方，或由SPV公司建立。</p>
                                <div className={s.tab}>
                                    <div className={s.tabson}>
                                      <div className={s.tabCon}>
                                        <img src={example3} alt="" style={{width: '100%', height: '100%'}}/>
                                      </div>
                                    </div>
                                  <div className={s.tabson}>
                                    <div className={s.tabCon}>
                                      <img src={example4} alt="" style={{width: '100%', height: '100%'}}/>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 应用案例 */}
                    <div className={s.wit} id="example">
                      <h1 className={s.tit}>应用案例</h1>
                      <div className={s.witcontent}>
                        <div style={{width: '100%'}} className={s.tabContent}>
                          <div className={s.tabLeft}>
                            {
                              tabGroupB.map((item,index) => {
                                return <div className={`${s.tabItem} ${GroupBChecked === index ? s.tabItemActive : ''}`} onClick={() => {this.setState({GroupBChecked: index})}}>{item}</div>
                              })
                            }
                          </div>
                          <div className={s.tabRight}>
                            <img src={example2} alt="" style={{width: '100%', height: `${97 * 6}px`}}/>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <footer style={{position:'relative'}}>
                <img src="https://img.alicdn.com/tfs/TB16w4Lf3mTBuNjy1XbXXaMrVXa-1920-292.jpg" alt="" style={{ width: '100%', height: 200 }} />
                <div className={s.footer}>
                        <div>咨询我们</div>
                    </div>
                </footer>
            </div>
        );
    }
}
export default Addpeople;

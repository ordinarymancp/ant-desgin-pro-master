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

    render() {
        return (
            <div style={{width: '100%', height: '100%', background: 'white', marginTop: '64px'}}>
                <header style={{ position: 'relative' }}>
                    <img src={imgs} alt="" style={{ width: '100%', height: 350 }} />
                    <div className={s.bt}>
                        <span>资讯我们</span>
                    </div>
                </header>
                <nav style={{ paddingLeft: 40 }}>
                    <ul className={s.nav}>
                        <li><a href="#overview">概述</a></li>
                        <li><a href="#product">产品架构</a></li>
                        <li><a href="#introduction">方案介绍</a></li>
                        <li><a href="#manage">运营管理</a></li>
                        <li><a href="#example">应用案例</a></li>
                    </ul>
                </nav>
                <div className={s.enpty}></div>
                <div className={s.content}>
                    {/* 教育建设 */}
                    <div className={s.wit} id="overview">
                        <h1 className={s.tit}>智慧教育建设内容</h1>
                        <div className={s.witcontent}>
                          智慧教育采用教育云的建设模式，包括“云”和“端”两部分。其中“云”主要包括1个云核心基础支撑平台、1个
                          支持运营服务中心、5个应用平台（分别为“人人通”平台、教育云资源平台、教育公共服务管理平台、云课堂教学服
                          务平台、校园综合管理服务平台）；“端”的建设主要是智慧学校应用环境，包括：视频监控系统、门禁一卡通系统、
                          信息发布系统、图书馆电子阅读系统、智慧教室、未来空间、多媒体互动教室、云桌面系统、WIFI覆盖等。
                        </div>
                    </div>
                    {/* 总体架构 */}
                    <div id="product">
                        <h1 className={s.tit}>总体架构</h1>
                        <div className={s.witcontent}>
                            <div className={s.titnav}>
                              <img src={example1} alt="" style={{width: '95%', height: '700px', margin: '0 auto'}}/>
                            </div>
                        </div>
                    </div>
                    {/* 方案介绍 */}
                    <div className={s.scheme} id="introduction">
                        <h1 className={s.tit}>方案介绍</h1>
                        <div className={s.scheme_content}>
                            <Tabs defaultActiveKey="1" tabPosition='left' size='default' >
                                <TabPane tab={<h1 style={{ fontSize: 23, fontWeight: 700 }}>教育云-支持服务运营中心</h1>} key="1">
                                  <img src={example2} alt="" style={{width: '100%', height: '450px'}}/>
                                </TabPane>
                                <TabPane tab={<h1 style={{ fontSize: 23, fontWeight: 700 }}>教育公共服务管理平台</h1>} key="2" >
                                    Content of Tab Pane 2
                                </TabPane>
                                <TabPane tab={<h1 style={{ fontSize: 23, fontWeight: 700 }}>教育云资源平台</h1>} key="3" >
                                    Content of Tab Pane 3
                                </TabPane>
                                <TabPane tab={<h1 style={{ fontSize: 23, fontWeight: 700 }}>人人通网络学习空间平台</h1>} key="4">
                                    Content of Tab Pane 1
                                </TabPane>
                                <TabPane tab={<h1 style={{ fontSize: 23, fontWeight: 700 }}>云课堂教学服务平台</h1>} key="5">
                                    Content of Tab Pane 2
                                </TabPane>
                                <TabPane tab={<h1 style={{ fontSize: 23, fontWeight: 700 }}>校园综合管理平台</h1>} key="6">
                                    Content of Tab Pane 3
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    {/* 运营管理 */}
                    <div className={s.run} id="manage">
                        <h1 className={s.tit}>运营管理</h1>
                        <div className={s.runcont}>
                            <div style={{ paddingLeft: 15, paddingRight: 15, }}>
                                <p style={{ marginTop: 20, fontSize: 18 }}>在建设好智慧教育系统的同时，通过高效的运营，既充分发挥出了智慧教育系统的优势，又为社会创造了经济效益和社会效益。
                                  通过教育云运营，切实发挥智慧教育系统的作用，扩大优质资源覆盖面，缩小城乡、重点学校和非重点学校之间的差别，加强教
                                  育管理，全面提高教育水平，实现教育部提出的教育信息化各项核心目标。</p>
                                <p style={{ marginTop: 15, fontSize: 18, fontWeight: 700 }}>智慧教育的运营分两种模式，基础服务运营和增值服务运营。这两种服务均由运营公司管理运营，运营公司的建立有多种模式，
                                  比如政府委托第三方，或由SPV公司建立。</p>
                                <div className={s.tab}>
                                    <div className={s.tabson}>
                                      <img src={example3} alt="" style={{width: '100%', height: '100%'}}/>
                                    </div>
                                    <div className={s.tabson}>
                                      <img src={example4} alt="" style={{width: '100%', height: '100%'}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 应用案例 */}
                    <div className={s.ap} id="example">
                        <h1 className={s.tit}>应用案例</h1>
                        <div className={s.aocont}>
                            <Tabs defaultActiveKey="1" tabPosition='left' size='default' >
                                <TabPane tab={<h1 style={{ fontSize: 23, fontWeight: 700 }}>张家口教育云一期</h1>} key="1">
                                  <img src={example5} alt="" style={{width: '100%', height: '700px'}}/>
                                </TabPane>
                                <TabPane tab={<h1 style={{ fontSize: 23, fontWeight: 700 }}>泾川县教育公共服务平台</h1>} key="2" >
                                    Content of Tab Pane 2
                                </TabPane>
                                <TabPane tab={<h1 style={{ fontSize: 23, fontWeight: 700 }}>基础教育资源公共平台</h1>} key="3" >
                                    Content of Tab Pane 3
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <footer style={{position:'relative'}}>
                <img src={imgs} alt="" style={{ width: '100%', height: 350 }} />
                <div className={s.footer}>
                        <div>资讯我们</div>
                    </div>
                </footer>
            </div>
        );
    }
}
export default Addpeople;

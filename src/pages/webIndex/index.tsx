import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.scss';
import router from 'umi/router';
import { Select } from 'antd';
import index from  '../../../public/image/index.jpg'
// @ts-ignore
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class webIndex extends React.Component {
  Option = Select.Option;
  state = {
    welcomeState: true,
  };

  componentDidMount(): void {}

  handleChange = value => {
    if (value === '欢迎页') {
      router.push('/index/welcomeIndex');
    } else {
      router.push('/index/enddingIndex');
    }
  };

  linkClick = url => {
    router.push(url);
  };

  gotoWelcome = () => {
    const { welcomeState } = this.state;
    if (welcomeState) {
      router.push('/index/welcomeIndex');
    }
  };

  render() {
    return (
      <div className={styles.indexWrap} style={{background: `url(${index})`, backgroundSize: '100% 100%',}}>
        <div className={styles.indexBigTitle}>长三角一体化互联网大脑展示平台</div>
        <div className={styles.indexUnderTitle}>
          <div>上海大数据股份</div>
        </div>
        <div className={styles.menuWrap}>
          <div className={styles.indexMenuItem} onClick={this.linkClick.bind(this, '/')}>
            宣传视频
          </div>
          <div
            className={styles.indexMenuItem}
            onClick={this.linkClick.bind(this, '/applicatioScenario')}
          >
            智慧城市应用
          </div>
          <div className={styles.indexMenuItem} onClick={this.linkClick.bind(this, '/settings')}>
            设置
          </div>
          <div className={styles.indexMenuItem} onClick={this.linkClick.bind(this, '/cloudSpace')}>
            云空间
          </div>
          <div className={styles.indexMenuItem} onClick={this.linkClick.bind(this, '/favorites')}>
            我的收藏
          </div>
          <div className={styles.indexMenuItem}>
            故障申报
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '10%', left: '5%' }}>
          <Select defaultValue="欢迎词" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="欢迎页">欢迎词</Option>
            <Option value="结束页">结束词</Option>
          </Select>
          {/*<span className={styles.gotoIndex} onClick={this.gotoWelcome}>*/}
          {/*  前往*/}
          {/*</span>*/}
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({}))(webIndex);

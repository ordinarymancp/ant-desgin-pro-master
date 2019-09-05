import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.scss';
import router from 'umi/router';
import PageLoading from '@/components/PageLoading';
import MenuItem from '@/components/MenuItem';
import { message } from 'antd';

@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function
class applicatioScenarioIndex extends React.Component {
  componentDidMount(): void {
    // const titleGroup = this.props.match.params.name.split('&');
    // this.setState({
    //   preTitle: titleGroup[0],
    //   nextTitle: titleGroup[1],
    // })
    const { iframeUrl, match } = this.props;
    const currentModel = localStorage.getItem('currentMosel');
    this.setState({ content: match.params.name, currentModel });
    if (iframeUrl) {
      const iframeUrlString = JSON.stringify({ iframeUrl });
      localStorage.setItem('iframeUrl', iframeUrlString);
      this.setState({ iframeUrl });
    } else {
      const iframeUrl = JSON.parse(localStorage.getItem('iframeUrl') as string).iframeUrl;
      this.setState({ iframeUrl });
    }
  }

  state = {
    canHidden: false,
    iframeUrl: '',
    content: '',
    currentModel: '',
    hiddenState: true,
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
            const { dispatch } = this.props;
            dispatch({
              type: 'global/setIframeUrl',
              payload: { iframeUrl: item.solutionSonGroup[index + 1].url },
            });
            router.push('/index/applicatioScenarioIndex/' + item.solutionSonGroup[index + 1].name);
            const iframeUrlString = JSON.stringify({
              iframeUrl: item.solutionSonGroup[index + 1].url,
            });
            localStorage.setItem('iframeUrl', iframeUrlString);
            location.reload();
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
            const { dispatch } = this.props;
            dispatch({
              type: 'global/setIframeUrl',
              payload: { iframeUrl: item.solutionSonGroup[index - 1].url },
            });
            router.push('/index/applicatioScenarioIndex/' + item.solutionSonGroup[index - 1].name);
            const iframeUrlString = JSON.stringify({
              iframeUrl: item.solutionSonGroup[index - 1].url,
            });
            localStorage.setItem('iframeUrl', iframeUrlString);
            location.reload();
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
    })
  }

  movein = () => {
    this.setState({
      hiddenState: false,
    })
  }

  moveout = () => {
    this.setState({
      hiddenState: true,
    })
  }

  render() {
    // const {preTitle, nextTitle} = this.state;
    const { iframeUrl, canHidden, hiddenState} = this.state;
    return (
      <div style={{ width: '100%', height: '100%', background: 'rgba(15, 10, 11, 1)' }}>
        <div style={{position: 'fixed',height: '100%', width: '3%', right: 0, zIndex: '999'}} onMouseOver={this.movein} onMouseOut={this.moveout}>
         <div style={{width: '70%', height: '100%', background: 'rgba(0,0,0,0.3)', float: 'right'}}>
           <div
             hidden={hiddenState}
             style={{
               height: '47%',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'space-between',
               bottom: '0',
               position: 'fixed',
               right: '2%',
               bottom: '12%',
               background: 'rgba(0,0,0,0.6)',
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
               <MenuItem content="搜索" />
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
        <div
          style={{
            width: '15%',
            height: '100%',
            boxSizing: 'border-box',
            padding: '1% 0 5% 0',
            right: '0',
            position: 'fixed',
            zIndex: '99',
          }}
        >
          {/*<div style={{ width: '100%', height: '23%' }}>*/}
          {/*  <div style={{ width: '100%', margin: '0 auto' }}>*/}
          {/*    <div className={styles.navbarWrap}>*/}
          {/*      <div className={styles.buttonStyle} style={{fontWeight: '900'}}>主页</div>*/}
          {/*    </div>*/}
          {/*    <div className={styles.navbarWrap}>*/}
          {/*      <div className={styles.buttonStyle} style={{ fontWeight: '300'}}>{currentModel}</div>*/}
          {/*    </div>*/}
          {/*    <div className={styles.navbarWrap}>*/}
          {/*      <div className={styles.buttonStyle} style={{ fontWeight: 'lighter'}}>{content}</div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div style={{ width: '100%', height: '100%', position: 'relative', float: 'left' }}>
          <div style={{ display: `${canHidden ? 'block' : 'none'}` }}>
            <PageLoading />
          </div>
          <iframe
            src={iframeUrl}
            frameBorder="none"
            onLoad={this.hiddenLoading}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              background: 'rgba(15, 10, 11, 1)',
            }}
          />
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  iframeUrl: global.iframeUrl,
}))(applicatioScenarioIndex);

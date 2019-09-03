import React from 'react';
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import styles from './index.scss';
import router from "umi/router";
import PageLoading from "@/components/PageLoading";


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
    const { iframeUrl } = this.props;
    if (iframeUrl){
      const iframeUrlString = JSON.stringify({iframeUrl})
      localStorage.setItem('iframeUrl', iframeUrlString)
      this.setState({iframeUrl})
    }else{
      const iframeUrl = JSON.parse(localStorage.getItem('iframeUrl') as string).iframeUrl
      this.setState({iframeUrl})
    }
  }

  state = {
    canHidden: false,
    iframeUrl: '',
  }

  hiddenLoading = () => {
    this.setState({canHidden: false})
  }

  render() {
      // const {preTitle, nextTitle} = this.state;
    const { iframeUrl } = this.state;
    const { canHidden } = this.state;
    return (
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <div style={{display: `${canHidden ? 'block' : 'none'}`}}>
          <PageLoading/>
        </div>
        <iframe src={iframeUrl} frameBorder="0" onLoad={this.hiddenLoading}
                style={{width: '100%', height: '100%', position: 'relative'}}/>
        <span className={styles.gobackspan} onClick={router.goBack}>返回上一页</span>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  iframeUrl: global.iframeUrl,
}))(applicatioScenarioIndex);

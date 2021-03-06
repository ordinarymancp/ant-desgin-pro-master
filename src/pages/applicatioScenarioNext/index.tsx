import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.scss';
import Cards from '@/components/Cards';
import router from 'umi/router';
import HeaderSearch from '@/components/HeaderSearch';

// @ts-ignore
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class applicatioScenarioNext extends React.Component {
  state = {
    pageName: '',
    buttonGroup: [],
    searchResult: '',
    startIndex: 0,
    endIndex: 20,
  };

  componentDidMount(): void {
    // @ts-ignore
    const { match } = this.props;
    if (!localStorage.getItem('solutionGroup')) {
      // @ts-ignore
      const { solutionGroup } = this.props;
      localStorage.setItem('solutionGroup', JSON.stringify({ solutionGroup }));
    }
    localStorage.setItem('currentMosel', match.params.name);
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup') as string);
    // eslint-disable-next-line max-len
    const buttonGroup = solutionGroup.filter(
      (item: { name: any }) => item.name === match.params.name,
    )[0].solutionSonGroup;
    this.setState({
      pageName: match.params.name,
      buttonGroup,
    });
  }

  // nextPage = () => {
  //   if(this.state.startIndex + 20 <= this.state.buttonGroup.length) {
  //     this.setState({
  //       startIndex: this.state.startIndex + 20,
  //       endIndex: this.state.endIndex + 20,
  //     })
  //   }
  // }
  routerButtonClick = (url: any, name, bool) => {
    if (bool) {
      router.push('/wit/' + name);
    } else {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/setIframeUrl',
        payload: { iframeUrl: url },
      });
      if (name === '区域经济大脑' || name === '地理信息服务平台' || name === '城市运营中心' || name === '创富港智慧园区' || name === '盐城电商平台') {
        window.open(url);
      } else {
        router.push('/index/applicatioScenarioIndex/' + name);
      }
    }
  };

  searchHandle = (value: any) => {
    console.log(value);
    this.setState({
      searchResult: value,
    });
  };

  gotoIndex = () => {
    router.push('/applicatioScenario/');
  };

  gotoVideo = url => {
    router.push('/applicatioVideo/' + url);
  };

  render() {
    const { buttonGroup, searchResult, startIndex, endIndex, pageName } = this.state;
    return (
      <div style={{ width: '100%', height: '100%' }} className="overview">
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <h1
            style={{
              marginLeft: '1.5%',
              float: 'left',
              fontSize: '24px',
              // marginRight: '40px',
              color: 'rgba(255, 255, 255, 0.65)',
              width: '100%',
            }}
          >
            {pageName}
            <span className={styles.gotoIndex} onClick={this.gotoIndex}>
              返回上一页
            </span>
          </h1>
          {/*<HeaderSearch searchHandle={this.searchHandle} />*/}
        </div>
        <div className={styles.resultWrap}>
          {// @ts-ignore
          buttonGroup.map((item, index) => {
            // eslint-disable-next-line react/jsx-no-bind,radix
            const groupIndex = parseInt(String(index));
            if (groupIndex >= startIndex && groupIndex < endIndex) {
              // @ts-ignore
              if (!searchResult || buttonGroup[index].name.indexOf(searchResult) !== -1) {
                // eslint-disable-next-line max-len
                // @ts-ignore
                // eslint-disable-next-line max-len,react/jsx-no-bind
                const cardsContent = {
                  content: buttonGroup[index].name,
                  state: buttonGroup[index].state,
                  opacityTime: parseInt(index) * 100,
                  collected: buttonGroup[index].collected,
                  handleClick: buttonGroup[index].url
                    ? this.routerButtonClick.bind(
                        this,
                        buttonGroup[index].url,
                        buttonGroup[index].name,
                        buttonGroup[index].gotoContent,
                      )
                    : this.gotoVideo.bind(this, buttonGroup[index].name),
                  src: buttonGroup[index].image,
                  ischildrenCard: true,
                };
                return <Cards {...cardsContent} />;
              }
              return null;
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  solutionGroup: global.solutionGroup,
  solutionRouter: global.solutionRouter,
}))(applicatioScenarioNext);

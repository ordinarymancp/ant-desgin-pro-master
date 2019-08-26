import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.scss';
import Cards from '@/components/Cards';

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
      localStorage.setItem('solutionGroup', JSON.stringify({ solutionGroup }))
    }
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup') as string);
    // eslint-disable-next-line max-len
    const buttonGroup = solutionGroup.filter((item: { name: any; }) => item.name === match.params.name)[0].solutionSonGroup;
    this.setState({
      pageName: match.params.name,
      buttonGroup,
    })
  }

  // nextPage = () => {
  //   if(this.state.startIndex + 20 <= this.state.buttonGroup.length) {
  //     this.setState({
  //       startIndex: this.state.startIndex + 20,
  //       endIndex: this.state.endIndex + 20,
  //     })
  //   }
  // }
  routerButtonClick = (url: any) => {
    window.open(url, '', 'fullscreen = yes,channelmode = yes')
  }

  render() {
    const { buttonGroup, searchResult, startIndex, endIndex, pageName } = this.state;
    return (
        <div style={{ width: '100%', height: '100%' }} className= "overview">
          <div>
            <h1 style={{ marginLeft: '1.5%', fontSize: '20px' }}>{pageName}</h1>
          </div>
          <div className={styles.resultWrap}>
            {
              // @ts-ignore
              buttonGroup.map((item, index) => {
                // eslint-disable-next-line react/jsx-no-bind,radix
                const groupIndex = parseInt(String(index));
                if (groupIndex >= startIndex && groupIndex < endIndex) {
                  // @ts-ignore
                  if (!searchResult || buttonGroup[index].name.indexOf(searchResult) !== -1) {
                    // eslint-disable-next-line max-len
                    // @ts-ignore
                    // eslint-disable-next-line max-len,react/jsx-no-bind
                    return <Cards content={buttonGroup[index].name} state={buttonGroup[index].state} opacityTime={parseInt(index)*100} collected={buttonGroup[index].collected} handleClick={this.routerButtonClick.bind(this, buttonGroup[index].url)}/>
                  } return null
                } return null
              })
            }
          </div>
        </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  solutionGroup: global.solutionGroup, solutionRouter: global.solutionRouter,
}))(applicatioScenarioNext);

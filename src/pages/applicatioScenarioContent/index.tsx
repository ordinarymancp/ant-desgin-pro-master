import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.scss';
import PDF from 'react-pdf-js';
import {Icon, message} from 'antd';
import pdf from '../../../public/pdf/1.pdf'
import router from "umi/router";
import MenuItem from "@/components/MenuItem";
import contentback from '../../../public/image/contentback.jpg';
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function
class applicatioScenarioContent extends React.Component {
  state = {
    name: '',
    description: '',
    pdfName: '',
    example: [],
    hiddenState: true,
  };

  componentDidMount(): void {
    const { match } = this.props;
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup'));
    solutionGroup.forEach(item => {
      item.solutionSonGroup.forEach((items, index) => {
        if (items.name === match.params.name) {
          const content = JSON.parse(items.content)
          this.setState({
            name: items.name,
            description: content.description,
            pdfName: content.pdfname,
            example: content.example,
          })
        }
      });
    });
  }
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

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
  findAndSet = () => {
    const { name } = this.state;
    console.log(name)
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup'));
    solutionGroup.forEach(item => {
      item.solutionSonGroup.forEach(items => {
        if (items.name === name) {
          items.collected = true;
          message.info('收藏成功', [1]);
        }
      });
    });
    localStorage.setItem('solutionGroup', JSON.stringify({ solutionGroup }));
  };
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
  goBack = () => {
    const currentModel = localStorage.getItem('currentMosel');
    router.push('/applicatioScenarioNext/' + currentModel);
  };
  gotoAnother = () => {
    const { match } = this.props;
    router.push('/applicatioScenarioContentTwo/' + match.params.name);
  }
  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    const {  description, pdfName, example, hiddenState } = this.state
    // const {preTitle, nextTitle} = this.state;
    return (
      <div className="overview" style={{boxSizing: 'border-box', padding: '3%', background: `url(${contentback})`, backgroundSize: '100% 100%'}}>
        <div
          style={{ position: 'fixed', height: '100%', width: '3%', right: 0, zIndex: '999' }}
          onMouseOver={this.movein}
          onMouseOut={this.moveout}
        >
          <div
            style={{ width: '70%', height: '100%', background: 'rgba(0,0,0,0.3)', float: 'right' }}
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
                <MenuItem content="切换" handleClick={this.gotoAnother}/>
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
        <div className={styles.applicationScenarioContentTop}>
          {description}
        </div>
        <div className={styles.applicationScenarioContentBottom}>
          <div className={styles.applicationScenarioContentLeft}>
            {pdfName ?  <PDF
              style={{width: '100%', height: '100%'}}
              file={require(`../../../public/pdf/${pdfName}.pdf`)}
              onDocumentComplete={this.onDocumentComplete}
              page={this.state.page}
            /> : ''}
            {pagination}
          </div>
          <div className={styles.applicationScenarioContentRight}>
            <div className={styles.applicationScenarioContentRightTop}>
              <h2>建设内容简要</h2>
            </div>
            <div className={styles.applicationScenarioContentRightBottom}>
              <h2 style={{width: '100%', textAlign: 'left'}}>应用案例</h2>
              {example.map(item => {
                return(
                  <div className={styles.applicationScenarioContentRightBottomItem}>{item.title}</div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  iframeUrl: global.iframeUrl,
}))(applicatioScenarioContent);

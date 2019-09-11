import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.scss';
import PDF from 'react-pdf-js';
import {Icon, message} from "antd";
import contentback from '../../../public/image/contentback.jpg';
import router from "umi/router";
import MenuItem from "@/components/MenuItem";
import { message } from 'antd';

@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function
class applicatioScenarioContentTwo extends React.Component {
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
          console.log(items)
          const content = JSON.parse(items.content)
          console.log(content.example)
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
    router.push('/applicatioScenarioContent/' + match.params.name);
  }
  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    // const {preTitle, nextTitle} = this.state;
    const { name, description, pdfName, example, hiddenState } = this.state
    console.log(name,description,example,pdfName)
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
        <div className={styles.applicationScenarioContentLeft}>
          <div className={styles.applicationScenarioContentLeftTop}>
            <span className={styles.applicationScenarioContentLeftTopTab}>简介</span>
            {description}
          </div>
          <div className={styles.applicationScenarioContentLeftBottom}>
            <span className={styles.applicationScenarioContentLeftTopTabChecked}>案例</span>
            <span className={styles.applicationScenarioContentLeftTopTabNext}>视频</span>
            <div style={{width:'100%', height: '100%', overflow: 'auto'}}>
              {example.map(item => {
                return(
                  <div>
                    <h3>{item.title}</h3>
                    <p style={{width: '100%', wordBreak: 'break-all'}}>
                      {item.content}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className={styles.applicationScenarioContentRight}>

          <span className={styles.applicationScenarioContentRightTopTab}>解决方案</span>
          {
            pdfName ? <PDF
              style={{width: '100%', height: '100%'}}
              file={require(`../../../public/pdf/${pdfName}.pdf`)}
              onDocumentComplete={this.onDocumentComplete}
              page={this.state.page}
            /> : ''
          }

          {pagination}
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  iframeUrl: global.iframeUrl,
}))(applicatioScenarioContentTwo);

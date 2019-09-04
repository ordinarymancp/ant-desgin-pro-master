import React from 'react';
import styles from './index.scss';
import Collect from '@/components/Collect';
import ppt from '../../../public/image/ppt.png';
import moxing from '../../../public/image/moxing.png';
import saasguanli from '../../../public/image/saasguanli.png';

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    styleState: '',
    src:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566285512395&di=d3ac38876873eb4158e0a863dc60b4b7&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw500h268%2F20180123%2F3c99-fyqwiqi6981317.jpg',
    hidden: true,
    realState: true,
    modleState: true,
    pptState: true,
  };

  componentDidMount(): void {
    const { state, src, opacityTime } = this.props;
    switch (state) {
      case 'simulation':
        this.setState({
          styleState: styles.simulation,
        });
        break;
      case 'solution':
        this.setState({
          styleState: styles.solution,
        });
        break;
      default:
        this.setState({
          styleState: styles.real,
        });
    }
    if (src) {
      this.setState({
        src,
      });
    }
    setTimeout(
      () => {
        this.setState({ hidden: false });
      },
      opacityTime ? opacityTime : 100,
    );
  }

  changeRealState = () => {
    this.setState({ realState: false });
  };
  changeRealStateFalse = () => {
    this.setState({ realState: true });
  };
  changeModelState = () => {
    this.setState({ modleState: false });
  };
  changeModelStateFalse = () => {
    this.setState({ modleState: true });
  };
  changePptState = () => {
    this.setState({ pptState: false });
  };
  changePptStateFalse = () => {
    this.setState({ pptState: true });
  };
  render() {
    const { content, handleClick, collected, ischildrenCard } = this.props;
    const { styleState, src, hidden, modleState, realState, pptState } = this.state;
    return (
      <div
        style={{
          width: '30%',
          marginBottom: 60,
          marginRight: '1.5%',
          marginLeft: '1.5%',
          perspective: '800px',
        }}
      >
        <div
          style={{ width: '100%', perspective: '800px', transition: '0.7s ease-out' }}
          className={hidden ? styles.cardHidden : styles.cardShow}
        >
          <div
            style={{
              marginBottom: '10px',
              color: 'rgba(255, 255, 255, 0.65)',
              fontWeight: 'bold',
              fontSize: '21px',
              float: `${!ischildrenCard ? 'left' : ''}`,
            }}
          >
            {content}
            {collected || collected === false ? (
              <Collect content={content} collected={collected ? collected : false}></Collect>
            ) : (
              ''
            )}
          </div>
          {!ischildrenCard ? (
            <div style={{ float: 'left', marginLeft: '20px', marginTop: '5px' }}>
              <div
                style={{
                  width: '70px',
                  height: '30px',
                  marginRight: '20px',
                  float: 'left',
                  zIndex: '99',
                }}
              >
                <img
                  src={saasguanli}
                  alt=""
                  style={{ width: '20px', height: '20px', marginLeft: '30px' }}
                  hidden={!realState}
                  onMouseOver={this.changeRealState}
                />
                <div
                  style={{
                    background: 'rgba(35,32,30,0.96)',
                    color: 'rgba(255,255,255,0.65)',
                    width: '80px',
                    height: '30px',
                    lineHeight: '26px',
                    textAlign: 'center',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                  hidden={realState}
                  onMouseOut={this.changeRealStateFalse}
                >
                  真实数据(0)
                </div>
              </div>
              <div style={{ width: '70px', height: '20px', marginRight: '20px', float: 'left' }}>
                <div
                  style={{
                    width: '70px',
                    height: '30px',
                    marginRight: '20px',
                    float: 'left',
                    zIndex: '99',
                  }}
                >
                  <img
                    src={moxing}
                    alt=""
                    style={{ width: '20px', height: '20px', marginLeft: '30px' }}
                    hidden={!modleState}
                    onMouseOver={this.changeModelState}
                  />
                  <div
                    style={{
                      background: 'rgba(35,32,30,0.96)',
                      color: 'rgba(255,255,255,0.65)',
                      width: '80px',
                      height: '30px',
                      lineHeight: '26px',
                      textAlign: 'center',
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                    hidden={modleState}
                    onMouseOut={this.changeModelStateFalse}
                  >
                    模拟数据(0)
                  </div>
                </div>
              </div>
              <div style={{ width: '70px', height: '20px', float: 'left' }}>
                <div
                  style={{
                    width: '70px',
                    height: '30px',
                    marginRight: '20px',
                    float: 'left',
                    zIndex: '99',
                  }}
                >
                  <img
                    src={ppt}
                    alt=""
                    style={{ width: '20px', height: '20px', marginLeft: '30px' }}
                    hidden={!pptState}
                    onMouseOver={this.changePptState}
                  />
                  <div
                    style={{
                      background: 'rgba(35,32,30,0.96)',
                      color: 'rgba(255,255,255,0.65)',
                      width: '70px',
                      height: '30px',
                      lineHeight: '26px',
                      textAlign: 'center',
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                    hidden={pptState}
                    onMouseOut={this.changePptStateFalse}
                  >
                    ppt(0)
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <img
            alt="example"
            className={styleState}
            onClick={handleClick ? handleClick.bind(this) : null}
            src={src}
          />
        </div>
      </div>
    );
  }
}
export default Cards;

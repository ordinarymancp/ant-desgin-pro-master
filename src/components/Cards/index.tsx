import React from 'react';
import styles from './index.scss';
import Collect from '@/components/Collect';
class Cards extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    styleState: '',
    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566285512395&di=d3ac38876873eb4158e0a863dc60b4b7&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw500h268%2F20180123%2F3c99-fyqwiqi6981317.jpg',
    hidden: true,
  }

  componentDidMount(): void {
    const { state, src, opacityTime } = this.props;
    switch (state) {
      case 'simulation':
        this.setState({
          styleState: styles.simulation,
        })
        break;
      case 'solution':
        this.setState({
          styleState: styles.solution,
        })
        break;
      default:
        this.setState({
          styleState: styles.real,
        })
    }
    if (src) {
      this.setState({
        src,
      })
    }
    setTimeout(() => {
      this.setState(
        { hidden: false },
      )
    }, opacityTime ? opacityTime : 100)
  }

  render() {
    const { content, handleClick, collected} = this.props;
    const { styleState, src, hidden } = this.state;
    return (
      <div style={{width: '30%', marginBottom: 60, marginRight: '1.5%', marginLeft: '1.5%', perspective: '800px'}}>
        <div style={{ width: '100%', perspective: '800px', transition: '0.7s ease-out' }} className={ hidden ? styles.cardHidden : styles.cardShow}>
          <div style={{ marginBottom: '10px', color:'rgba(255, 255, 255, 0.65)'}}>{content}
            {collected || collected === false ? <Collect content={content} collected={collected ? collected : false}></Collect> : ''}
          </div>
          <img alt="example" className={styleState} onClick={handleClick ? handleClick.bind(this) : null} src={src} />
        </div>
      </div>
    )
  }

}
export default Cards;

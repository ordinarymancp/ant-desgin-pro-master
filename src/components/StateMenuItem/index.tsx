import React from 'react';
import styles from './index.scss';
class StateMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    colorStyle: null,
  }
  componentDidMount(): void {
    switch (this.props.state) {
      case 'real':
        this.setState({
          colorStyle: styles.sharpGreen,
        })
        break;
      case 'simulation':
        this.setState({
          colorStyle: styles.sharpBlue,
        })
        break;
      default:
        this.setState({
          colorStyle: styles.sharpPurple,
        })
    }
  }

  render() {
    const { state, content, handleClick} = this.props;
    const { colorStyle } = this.state;
    return (
      <p className= {colorStyle} onClick={handleClick ? handleClick.bind(this) : null}>
        {content}
      </p>
    )
  }

}
export default StateMenuItem;

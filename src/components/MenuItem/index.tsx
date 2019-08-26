import React from 'react';
import styles from './index.scss';
class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { stylesClassName, content, handleClick} = this.props
    return (
      <p className= {`${styles.sharp} ${stylesClassName ? stylesClassName : ''}`} onClick={handleClick ? handleClick.bind(this) : null}>
        {content}
      </p>
    )
  }

}
export default MenuItem;

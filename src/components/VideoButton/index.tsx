import React from 'react';
import styles from './index.scss';
import { Icon } from 'antd';
class VideoButton extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {}

  render() {
    const { icon, handleClick, id } = this.props;
    return (
      <div className={styles.videoButton}>
        <div style={{ position: 'absolute', top: '5px', left: '5px' }}>
          <ul className="pie">
            <li className="slice-1 slice"></li>
            <li className="slice-2 slice"></li>
            <li className="slice-3 slice"></li>
            <li className="slice-4 slice"></li>
            <li className="slice-5 slice"></li>
            <li className="slice-6 slice"></li>
            <li className="slice-7 slice"></li>
            <li className="slice-8 slice"></li>
            <li className="slice-9 slice"></li>
            <li className="slice-10 slice"></li>
          </ul>
        </div>
        <div className={styles.videoButtonCenter} onClick={handleClick}>
          {/*<Icon type={icon} style={{ color: '#6faf9e' }} />*/}
          {icon}
        </div>
      </div>
    );
  }
}
export default VideoButton;

import React from 'react';
import styles from './index.scss';
class VideoButton extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {

  }

  render() {
    return (
      <div className={styles.videoButton}>
        <div className={styles.leftSector}></div>
      </div>
    )
  }

}
export default VideoButton;

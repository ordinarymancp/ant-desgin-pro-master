import React from 'react';
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import MenuItem from "@/components/MenuItem";
import styles from './index.scss';
import router from "umi/router";

@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function
class warehouse extends React.Component {
  state = {
    contentGroup: [
      { content: '宣传视频', src: 'promotionalVideo', position: styles.center },
      { content: '应用场景', src: 'applicatioScenario', position: styles.top },
      { content: '三维城市', src: 'threeDimensionalCity', position: styles.topLeft },
      { content: '设置', src: 'settings', position: styles.topRight },
      { content: '故障申报', src: 'failureReport', position: styles.bottom },
      { content: '云管平台', src: 'managementPlatform', position: styles.bottomLeft },
      { content: '我的收藏', src: 'myCollection', position: styles.bottomRight },
    ],
  };
    handleClick = (index) => {
      router.push('/' + this.state.contentGroup[index].src)
    }
  render() {
    const { contentGroup } = this.state;
    return (
      <div className= 'overview' style={{ background: 'white' }}>
        <div className={styles.sharpContainer}>
          {
            contentGroup.map((item, index) => {
              const { position, content } = contentGroup[index]
              // eslint-disable-next-line react/jsx-no-bind
              return  <MenuItem stylesClassName={position} content={content} handleClick={this.handleClick.bind(this, index)}></MenuItem>
            })
          }
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({

}))(warehouse);

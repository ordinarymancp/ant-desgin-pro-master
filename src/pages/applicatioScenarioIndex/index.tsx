import React from 'react';
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import styles from './index.scss';


@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function
class applicatioScenarioIndex extends React.Component {
  state = {
    preTitle: '',
    nextTitle: ''
  }
  componentDidMount(): void {
    const titleGroup = this.props.match.params.name.split('&');
    this.setState({
      preTitle: titleGroup[0],
      nextTitle: titleGroup[1],
    })
  }

  render() {
      const {preTitle, nextTitle} = this.state;
    return (
      <div className={styles.appilcatioWrap}>
        <div className={styles.appilcatioTitle}>
          <h4 className={styles.leftH1Title}>应用场景 - {preTitle} - {nextTitle}</h4>
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({

}))(applicatioScenarioIndex);

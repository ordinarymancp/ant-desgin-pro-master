import React from 'react';
import styles from './index.scss';
import {connect} from "dva";
import {ConnectState} from "@/models/connect";
import router from "umi/router";

class FullScreenWelcome extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    homeWelcome: '',
    lastWelcome: '',
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void {
    if (localStorage.getItem('settings') as string){
      const { homeWelcome, lastWelcome } = JSON.parse(localStorage.getItem('settings') as string);
      if(homeWelcome !== this.state.homeWelcome || lastWelcome !== this.state.lastWelcome){
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          homeWelcome,
          lastWelcome,
        })}
    }
  }

  render() {
    // @ts-ignore
    const { hidden, dispatch, isHomewelcome } = this.props;
    const { homeWelcome, lastWelcome } = this.state;
    const changeLang = (): void => {
      // dispatch({
      //   type: 'global/openWelcome',
      //   payload: { isHomewelcome, welcomeHidden: true },
      // })
      router.push('/')
    };
    return (
      <div className={hidden ? styles.welcomeBackgroundHiiden : styles.welcomeBackground} >
        <span className={styles.welcome}>{isHomewelcome ? homeWelcome : lastWelcome}</span>
        <span className={styles.editWelcome} onClick={changeLang}>前往主界面</span>
      </div>
    )
  }

}
export default connect(({ global, settings }: ConnectState) => ({
  welcomeHidden: global.welcomeHidden,
  isHomewelcome: global.isHomewelcome,
}))(FullScreenWelcome);

import React from 'react';
import styles from './index.scss';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import router from 'umi/router';

class FullScreenWelcome extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    homeWelcomeFirst: '',
    homeWelcomeSecond: '',
    lastWelcome: '',
  };

  componentDidMount(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void {
    if (localStorage.getItem('settings') as string) {
      const { homeWelcomeFirst, homeWelcomeSecond, lastWelcome } = JSON.parse(localStorage.getItem(
        'settings',
      ) as string);
      if (
        homeWelcomeFirst !== this.state.homeWelcomeFirst ||
        homeWelcomeSecond !== this.state.homeWelcomeSecond ||
        lastWelcome !== this.state.lastWelcome
      ) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          homeWelcomeFirst,
          homeWelcomeSecond,
          lastWelcome,
        });
      }
    }
  }

  render() {
    // @ts-ignore
    const { hidden, dispatch, isHomewelcome } = this.props;
    const { homeWelcomeFirst, homeWelcomeSecond, lastWelcome } = this.state;
    const changeLang = (): void => {
      // dispatch({
      //   type: 'global/openWelcome',
      //   payload: { isHomewelcome, welcomeHidden: false },
      // })
      router.push('/');
    };
    return (
      <div className={hidden ? styles.welcomeBackgroundHiiden : styles.welcomeBackground}>
        <span className={styles.welcome}>{isHomewelcome ? homeWelcomeFirst : lastWelcome}</span>
        <span className={styles.welcomeSecond}>
          {isHomewelcome ? homeWelcomeSecond : lastWelcome}
        </span>
        <span className={styles.editWelcome} onClick={changeLang}>
          前往主界面
        </span>
      </div>
    );
  }
}
export default connect(({ global, settings }: ConnectState) => ({
  welcomeHidden: global.welcomeHidden,
  isHomewelcome: global.isHomewelcome,
}))(FullScreenWelcome);

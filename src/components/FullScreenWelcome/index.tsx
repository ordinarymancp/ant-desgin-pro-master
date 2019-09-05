import React from 'react';
import styles from './index.scss';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import router from 'umi/router';
import welcome from '../../../public/image/welcome.jpg'
class FullScreenWelcome extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    homeWelcomeFirst: '',
    homeWelcomeSecond: '',
    lastWelcomeFirst: '',
    lastWelcomeSecond: '',
  };

  componentDidMount(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void {
    if (localStorage.getItem('settings') as string) {
      const { homeWelcomeFirst, homeWelcomeSecond, lastWelcome, lastWelcomeSecond, lastWelcomeFirst } = JSON.parse(localStorage.getItem(
        'settings',
      ) as string);
      if (
        homeWelcomeFirst !== this.state.homeWelcomeFirst ||
        homeWelcomeSecond !== this.state.homeWelcomeSecond ||
        lastWelcomeFirst !== this.state.lastWelcomeFirst ||
        lastWelcomeSecond !== this.state.lastWelcomeSecond
      ) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          homeWelcomeFirst,
          homeWelcomeSecond,
          lastWelcomeFirst,
          lastWelcomeSecond,
        });
      }
    }
  }

  render() {
    // @ts-ignore
    const { hidden, dispatch, isHomewelcome } = this.props;
    const { homeWelcomeFirst, homeWelcomeSecond, lastWelcomeFirst, lastWelcomeSecond } = this.state;
    console.log(isHomewelcome)
    const changeLang = (): void => {
      // dispatch({
      //   type: 'global/openWelcome',
      //   payload: { isHomewelcome, welcomeHidden: false },
      // })
      router.push('/index');
    };
    return (
      <div className={hidden ? styles.welcomeBackgroundHiiden : styles.welcomeBackground} style={{background: `url(${welcome})`, backgroundSize: '100% 100%'}}>
        <span className={styles.welcome}>{isHomewelcome ? homeWelcomeFirst : lastWelcomeFirst}</span>
        <span className={styles.welcomeSecond}>
          {isHomewelcome ? homeWelcomeSecond : lastWelcomeSecond}
        </span>
        <div className={styles.editWelcome}>
          <span className={styles.tans}></span>
          <span style={{marginLeft: '20px', marginBottom: '3px'}} onClick={changeLang}>
          前往主界面
        </span>
        </div>
      </div>
    );
  }
}
export default connect(({ global, settings }: ConnectState) => ({
  welcomeHidden: global.welcomeHidden,
}))(FullScreenWelcome);

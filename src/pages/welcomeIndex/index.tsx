import React from 'react';
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import FullScreenWelcome from '@/components/FullScreenWelcome';

@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function
class welcomeIndex extends React.Component {
  componentDidMount(): void {
    sessionStorage.setItem('firstComeIn', '1')
  }

  render() {
    return (
      <FullScreenWelcome/>
    );
  }
}
export default connect(({ global }: ConnectState) => ({

}))(welcomeIndex);

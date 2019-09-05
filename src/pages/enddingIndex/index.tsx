import React from 'react';
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import FullScreenWelcome from '@/components/FullScreenWelcome';

@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function
class enddingIndex extends React.Component {


  render() {
    return (
      <FullScreenWelcome isHomewelcome={false}/>
    );
  }
}
export default connect(({ global }: ConnectState) => ({

}))(enddingIndex);

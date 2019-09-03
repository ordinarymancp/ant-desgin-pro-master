import React from 'react';
import { Icon, message } from 'antd';
class Collect extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    contect: '',
    collected: false,
  }
  componentDidMount(): void {
    const { content, collected } = this.props;
    this.setState({
      content, collected,
    })
  }
  findAndSet = () => {
    const { content , collected  } = this.state
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup'));
    solutionGroup.forEach(item => {
      item.solutionSonGroup.forEach(items => {
        if(items.name === content){
          items.collected = true
          message.info('收藏成功',[1]);
        }
      })
    })
    localStorage.setItem('solutionGroup',JSON.stringify({solutionGroup}))
  }
  render() {
    const { collected } = this.state;
   return(
     <span style={{float: 'right', marginTop: '2px', color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'underline', cursor: 'pointer'}} onClick={this.findAndSet}>加入收藏</span>
   )
  }

}
export default Collect;

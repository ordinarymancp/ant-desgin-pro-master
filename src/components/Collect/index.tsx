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
          items.collected = !items.collected
          this.setState({
            collected: items.collected
          })
          if(items.collected){
            message.info('收藏成功',[1]);
          }else{
            message.info('取消收藏成功',[1]);
          }
        }
      })
    })
    localStorage.setItem('solutionGroup',JSON.stringify({solutionGroup}))
  }
  render() {
    const { collected } = this.state;
   return(
     <Icon type="heart" theme="twoTone" twoToneColor={`${collected ? "#8effba" : '#ff2c52' }`}  style={{float: 'right', marginTop: '2px'}} onClick={this.findAndSet}/>
   )
  }

}
export default Collect;

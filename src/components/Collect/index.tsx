import React from 'react';
import { Icon, message } from 'antd';
class Collect extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    contect: '',
    collected: false,
  };
  componentDidMount(): void {
    const { content, collected } = this.props;
    this.setState({
      content,
      collected,
    });
  }
  findAndSet = () => {
    const { content, collected } = this.state;
    const { solutionGroup } = JSON.parse(localStorage.getItem('solutionGroup'));
    solutionGroup.forEach(item => {
      item.solutionSonGroup.forEach(items => {
        if (items.name === content) {
          items.collected = !items.collected;
          this.setState({
            collected: items.collected
          })
          if(items.collected){
            message.info('收藏成功', [1]);
          }else{
            message.info('取消收藏成功', [1]);
          }
        }
      });
    });
    localStorage.setItem('solutionGroup', JSON.stringify({ solutionGroup }));
  };
  render() {
    const { collected } = this.state;
    return (
      <span
        style={{
          float: 'right',
          marginTop: '2px',
          color: 'rgb(108,135,255,0.8)',
          textDecoration: 'underline',
          cursor: 'pointer',
          fontSize: '17px',
          fontWeight: '300',
        }}
        onClick={this.findAndSet}
      >
        {!collected ? '加入收藏' : '取消收藏'}
      </span>
    );
  }
}
export default Collect;

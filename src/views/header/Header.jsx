import React, { Component } from 'react';
import './header.scss';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
 class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '/home',
      itemList:[
        {key:'/home',title:'首页',icon:'home'},
        {key:'/toutiao',title:'豆瓣电影',icon:'user'},
        {key:'/user',title:'关于我',icon:'user'},
      ]
    }
  }
  componentDidMount() {
    this.setState({
      current: this.props.location.pathname,
    });
  }
  
  handleClick = (e) => {
    this.props.callFn(e.key) //将值传递给父组件
    this.props.history.push(e.key) //路由跳转
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div className="menu_class">
        <Menu onClick={this.handleClick} selectedKeys={[this.props.location.pathname === '/' ? '/home' : this.props.location.pathname]} mode="horizontal" >
        {this.state.itemList.map((item)=>{
          return (
            <Menu.Item key={item.key}>
              <Icon type={item.icon} />{item.title}
            </Menu.Item>
          )
        })}
      </Menu>
      </div>
    )
  }
}

export default withRouter(Header);

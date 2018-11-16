import React, { Component } from 'react';
import './footer.scss';
import { Icon } from 'antd';

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="footer">
        <div className="my_icon">
          <Icon type="github" />
          <Icon type="weibo-circle" />
          <Icon type="qq" />
          <Icon type="wechat" />
        </div>
        <div className="copyright">
          <p>Copyright © 胡斯文 2018 </p>
          <p>哈哈哈哈哈哈哈这是一段介绍哈哈哈哈哈哈哈这是一段介绍哈哈哈哈哈哈哈哈哈哈这是一段介绍</p>
        </div>
      </div>
    )
  }
}

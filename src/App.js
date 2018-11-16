import React, { Component } from 'react';
import Header from './views/header/Header';
import Footer from './views/footer/Footer';
import './App.scss';
class App extends Component {
  constructor(props) {
    super(props)
    this.callFn = this.callFn.bind(this)
    this.state = {
       pageName:'',
    }
  }
  callFn(pageName){ //获取菜单栏选择的值
    this.setState({pageName:pageName})
  }
  
  render() {
    return (
      <div className="app_box">
        <Header callFn={this.callFn} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import './home.scss';
import { Carousel,Divider,Skeleton  } from 'antd';
import { get } from "../../static/js/http";

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  componentDidMount() {
    // get('/articleList').then(res=>{
    //   this.setState({articleList:res})
    //   setTimeout(() => {
    //     this.setState({loadingArticle:false})
    //   }, 500);
    // })
  }
  goArticle(id){
    // this.props.history.push(`/Article/${id}`)
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

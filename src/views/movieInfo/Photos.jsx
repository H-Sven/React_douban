import React, { Component } from 'react'
import { get } from "../../static/js/http";
import './photos.scss'

export default class Photos extends Component {
  constructor(props) {
    super(props)
    this.getMovieInfo = this.getMovieInfo.bind(this)
    this.state = {
      movieInfo: {}
    }
  }
  
  componentWillMount() {
    this.getMovieInfo(this.props.match.params.id)
  }
  getMovieInfo(id){
    get(`/subject/${id}/photos`,{}).then(res=>{
      console.log(res);
      this.setState({movieInfo:res})
      window.scrollTo(0,0);
    })
  }
  
  render() {
    const movieInfo = this.state.movieInfo;
    return (
      <div className="photos_box">
        <h1>{movieInfo.subject && `${movieInfo.subject.title}的全部图片`}</h1>
        <div className="photo_info">
          {movieInfo.photos && movieInfo.photos.map((item,index)=>{
            return <div className="img" key={index} style={{backgroundImage:`url(${item.image})`}}></div>
          })}
        </div>
      </div>
    )
  }
}

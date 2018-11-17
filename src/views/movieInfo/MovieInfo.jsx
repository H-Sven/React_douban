import React, { Component } from 'react'
import './movieinfo.scss';
import { Input,Rate,Progress } from 'antd';
import { get } from "../../static/js/http";



export default class MovieInfo extends Component {
  constructor(props) {
    super(props)
    this.getMovieInfo = this.getMovieInfo.bind(this)
    this.state = {
      id:null,
      movieInfo:{},
      celebrities:[],
      moviePhoto:[]
    }
  }
  componentWillMount() {
    this.setState({id:this.props.match.params.id})
    this.getMovieInfo(this.props.match.params.id);
  }
  getMovieInfo(id){
    get(`/subject/${id}`,{}).then(res=>{
      console.log(res);
      const celebrities = [...res.directors,...res.casts,...res.writers]
      const moviePhoto = [...res.trailers,...res.photos]
      this.setState({movieInfo:res,celebrities,moviePhoto});
      window.scrollTo(0,0);
    })
  }
  // 打星总人数
  getTotal(data){
    let num = 0;
    for (const key in data) {
      num = num + data[key];
    }
    return num
  }
  render() {
    const movieInfo = this.state.movieInfo;
    const celebrities = this.state.celebrities;
    const moviePhoto = this.state.moviePhoto;
    return (
      <div className="movie_info">
        <h1>{movieInfo.title}&nbsp;&nbsp;{movieInfo.original_title} <span>{movieInfo.year && (movieInfo.year)}</span> </h1>
        {/* 电影信息 */}
        <div className="movie_info_box">
          { movieInfo.images && <img src={movieInfo.images.small} alt=""/> }
          <div className="movie_introduce">
            <div>
              {movieInfo.directors && <span>导演：</span>}
              <span>{movieInfo.directors && movieInfo.directors.map((directors,index)=>{
                return <span className="text_span" key={index}>{directors.name}</span>
              })}</span>
            </div>
            <div>
              {movieInfo.writers && <span>编剧：</span>}
              <span>{movieInfo.writers && movieInfo.writers.map((writers,index)=>{
                return <span className="text_span" key={index}>{writers.name}</span>
              })}</span>
            </div>
            <div>
              {movieInfo.casts && <span>主演：</span>}
              <span>{movieInfo.casts && movieInfo.casts.map((casts,index)=>{
                return <span className="text_span" key={index}>{casts.name}</span>
              })}</span>
            </div>
            <div>
              {movieInfo.genres && <span>类型：</span>}
              <span>{movieInfo.genres && movieInfo.genres.map((genres,index)=>{
                return <span className="text_span" key={index}>{genres}</span>
              })}</span>
            </div>
            <div>
              {movieInfo.website && <span>官方网站：</span>}
              <span className="text_span">{movieInfo.website}</span>
            </div>
            <div>
              {movieInfo.countries && <span>制片国家/地区：</span>}
              <span>{movieInfo.countries && movieInfo.countries.map((countries,index)=>{
                return <span className="text_span" key={index}>{countries}</span>
              })}</span>
            </div>
            <div>
              {movieInfo.languages && <span>语言：</span>}
              <span>{movieInfo.languages && movieInfo.languages.map((languages,index)=>{
                return <span className="text_span" key={index}>{languages}</span>
              })}</span>
            </div>
            <div>
              {movieInfo.pubdates && <span>上映日期：</span>}
              <span>{movieInfo.pubdates && movieInfo.pubdates.map((pubdates,index)=>{
                return <span className="text_span" key={index}>{pubdates}</span>
              })}</span>
            </div>
            <div>
              {movieInfo.durations && <span>片长：</span>}
              <span>{movieInfo.durations && movieInfo.durations.map((durations,index)=>{
                return <span className="text_span" key={index}>{durations}</span>
              })}</span>
            </div>
            <div>
              {movieInfo.aka && <span>又名：</span>}
              <span>{movieInfo.aka && movieInfo.aka.map((aka,index)=>{
                return <span className="text_span" key={index}>{aka}</span>
              })}</span>
            </div>
          </div>
          {movieInfo.rating && 
            <div className="douban_rate">
                <div className="title">豆瓣评分</div>
                <div className="rate_box">
                  {movieInfo.rating && <span className="rating_num">{(movieInfo.rating.average).toFixed(1)}</span>}
                  <div className="rate">
                    {movieInfo.rating && <Rate className="rate" allowHalf disabled defaultValue={+(movieInfo.rating.average / 2).toFixed(1)} />}
                    <div>{movieInfo.ratings_count}评价</div>
                  </div>
                </div>
                <div className="rate_lv">
                  {movieInfo.rating && 
                    <div>
                      {movieInfo.rating.details && Object.keys(movieInfo.rating.details).map((lv,index)=>{
                        return (
                          <div key={index}>
                            <span>{lv}星  {(movieInfo.rating.details[lv] / this.getTotal.bind(this,movieInfo.rating.details)() * 100).toFixed(1)}%</span>
                            <Progress percent={+(movieInfo.rating.details[lv] / this.getTotal.bind(this,movieInfo.rating.details)() * 100).toFixed(1)} showInfo={false}></Progress>
                          </div> 
                        )
                      })}
                    </div>
                  }
                </div>
            </div>
          }
        </div>
        {/* 剧情简介 */}
        <div className="introduce">
          <h2>{movieInfo.title ? `${movieInfo.title}的剧情简介` : ''}</h2>
          <p>{movieInfo.summary}</p>
        </div>
        {/* 演员表 */}
        <h2>{movieInfo.title ? `${movieInfo.title}的演职表` : ''}</h2>
        <div className="celebrities">
          {celebrities && celebrities.slice(0,7).map((directors,index)=>{
            return (
              <div className="celebrities_list" key={index}>
                <img src={directors.avatars.medium} alt="Image" />
                <span className="name">{directors.name}</span>
              </div>
            )
          })}
        </div>
        {/* 视频和图片 */}
        <h2>{movieInfo.title ? `${movieInfo.title}的视频和图片` : ''}</h2>
        <div className="movie_pphoto">
          {moviePhoto && moviePhoto.slice(0,4).map((directors,index)=>{
            return (
              <div className="celebrities_list" key={index}>
                <img src={directors.medium} alt="Image" />
                <span className="name">{directors.title}</span>
              </div>
            )
          })}
        </div>
        {/* 短评 */}
        <h2>{movieInfo.title ? `${movieInfo.title}的短评` : ''}</h2>
        <div className="reviews">
          {movieInfo.popular_reviews && movieInfo.popular_reviews.map((reviews,index)=>{
            return (
              <div className="reviews_list" key={index}>
                <div className="reviews_name">
                  <span>{reviews.author.name}</span>
                  <Rate className="rate" allowHalf disabled defaultValue={+(reviews.rating.value).toFixed(1)} />
                </div>
                <p>{reviews.summary}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

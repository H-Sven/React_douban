import React, { Component } from 'react'
import './home.scss';
import { Input,Rate,Pagination} from 'antd';
import { get } from "../../static/js/http";

const Search = Input.Search;
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.getMovieList =this.getMovieList.bind(this)
    this.searchFun =this.searchFun.bind(this)
    this.clickSizeChange =this.clickSizeChange.bind(this)
    this.state = {
      movieList: {},
      showIndex:null,
    }
  }
  componentDidMount() {
    this.getMovieList()
  }
  watchMovieInfo(id){
    this.props.history.push(`/MovieInfo/${id}`)
  }
  getMovieList(start = 1,city = "北京",count = 15){
    get('/in_theaters',{ city,start,count }).then(res=>{
      console.log(res);
      this.setState({movieList:res});
      window.scrollTo(0,0);
    })
  }
  searchFun(value){
    console.log(`搜索内容:${value}`);
    this.getMovieList(1,value)
  }

  // 鼠标移入
  handleMouseOver(index){
    this.setState({showIndex:index})
  }
  // 鼠标移除
  handleMouseOut(index){
    this.setState({showIndex:null})
  }
  clickSizeChange(current){
    this.getMovieList(current)
  }
  render() {
    return (
      <div className="home">
        <div className="title">
          <h3>{this.state.movieList.title}</h3>
          <Search
            placeholder="搜索城市"
            onSearch={value => this.searchFun(value)}
            style={{ width: 200 }}
          />
        </div>
        <div className="movie_list">
          {
            this.state.movieList.subjects && this.state.movieList.subjects.map((item,index)=>{
              return (
                <div className="list_box" key={index} onClick={this.watchMovieInfo.bind(this,item.id)}>
                  <img src={item.images.small} className="img_responsive" alt="Image" onMouseEnter={this.handleMouseOver.bind(this,index)} onMouseLeave={this.handleMouseOut.bind(this,index)} />
                  <div className="movie_title">{item.title.length >6 ? `${item.title.slice(0,6)}...` : item.title}</div>
                  {item.rating.average / 2 < 0.1 ? 
                    <div> 暂无评分 </div> : 
                    <div>
                      <Rate className="rate" allowHalf disabled defaultValue={+(item.rating.average / 2).toFixed(1)} />
                      <span className="ant-rate-text">{+(item.rating.average).toFixed(1)}分</span>
                    </div>
                  }
                  {
                    this.state.showIndex === index ? 
                    <div className="tips_card">
                      <div className="triangle_border_left"></div>
                      <h5>{item.title}&nbsp;&nbsp;<span>{item.year}</span></h5>
                      <Rate className="rate_tips" allowHalf disabled defaultValue={+(item.rating.average / 2).toFixed(1)} />
                      <div className="date_diqu">{item.durations[1]}</div>
                      <div className="directors">导演&nbsp;&nbsp;{item.directors[0].name}</div>
                      <div className="casts"><div>主演</div>&nbsp;&nbsp;
                        <div className="casts_name">
                          {item.casts.map((name,indexs)=>{
                            return <span key={indexs}>{name.name}&nbsp;&nbsp;</span>
                          })}
                        </div>
                      </div>
                    </div> : <div></div>
                  }
                  
                </div>
              )
            })
          }
        </div>
        {/* 分页 */}
        <Pagination className="pagination" onChange={this.clickSizeChange} defaultPageSize={20} total={this.state.movieList.total} />
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:8,
    catagory:'general'
  }
  static propTypes={
    country:PropTypes.string.isRequired,
    pageSize:PropTypes.number.isRequired,
    catagory:PropTypes.string.isRequired
  }
  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading:false,
      page:1,
      totalPages:1,
      disablePrev:true,
      disableNext:false,
    };
    document.title = this.props.catagory==='general'? 'NewsShots' :`${this.capatalised(this.props.catagory)}-NewsShots`;
  }

  capatalised(cat){
    return cat.charAt(0).toUpperCase()+cat.slice(1);
  }

  async update(pageNO){
    this.setState({loading:true})
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=5e9640aca1c84bbc8b07f284fad297cf&page=${pageNO}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData)
    this.setState({
      page:pageNO,
      articles: parseData.articles,
      loading:false,
      totalPages: Math.ceil(parseData.totalResults/this.props.pageSize)
    })
    //console.log(pageNO,this.state.totalPages,parseData.totalResults)
  }
  
  componentDidMount(){
    this.update(this.state.page)
  }

  handlePrevClick = async ()=>{

    if(this.state.page <= 2){
      this.setState({disablePrev:true})
      this.setState({
        disableNext:false,
      })
      this.update(this.state.page-1)
    }
    else{
      this.setState({
        disableNext:false,
      })
      this.update(this.state.page-1)
    }
  }

  handleNextClick = async ()=>{

    if(this.state.page >= this.state.totalPages-1){
      this.setState({disableNext:true})
      this.setState({
        disablePrev:false,
      })
      this.update(this.state.page+1)
    }
    else{
      this.setState({
        disablePrev:false,
      })
      this.update(this.state.page+1)
    }
  }

  
  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center my-3'>{this.props.catagory==='general'? 'Top Headlines' :`Top ${this.capatalised(this.props.catagory)} Headlines`}</h1>
        {this.state.loading === true&&(<Spinner/>)}
        <div className='row'>
          {this.state.loading === false&&this.state.articles.map(({title,description,urlToImage,url,author,publishedAt,source:{name}})=>{
            return <div className='col-sm' key = {url}>
              <NewsItem title={title} description={description} imageURl={urlToImage} newsUrl={url} author={author} date={publishedAt} source={name}/>
            </div>}
          )}
        </div>
        <div className='container d-flex justify-content-around my-3'>
          <button type="button" className="btn btn-secondary" onClick={this.handlePrevClick} disabled={this.state.disablePrev}>prev</button>
          <button type="button" className="btn btn-secondary" onClick={this.handleNextClick} disabled={this.state.disableNext}>next</button>
        </div>
      </div>
    )
  }
}
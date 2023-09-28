import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

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
      totalResults:0
    };
    document.title = this.props.catagory==='general'? 'NewsShots' :`${this.capatalised(this.props.catagory)}-NewsShots`;
  }

  capatalised(cat){
    return cat.charAt(0).toUpperCase()+cat.slice(1);
  }

  async update(pageNO,props){
    this.setState({loading:true})
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=27f835bb27d147ff81f6e4486119b270&page=${pageNO}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page:pageNO,
      articles: pageNO===1 ? parseData.articles : [...this.state.articles, ...parseData.articles],
      loading:false,
      totalResults:parseData.totalResults
    })
  }
  
  componentDidMount(){
    this.update(this.state.page)
  }

  fetchMoreData = () => {
    setTimeout(() => {
      this.update(this.state.page+1)
    }, 3000);
  };
  
  render() {
    return (
      <>
      
        <h1 className='text-center my-3'>{this.props.catagory==='general'? 'Top Headlines' :`Top ${this.capatalised(this.props.catagory)} Headlines`}</h1>
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container my-3">
          <div className='row'>
            {this.state.articles.map(({title,description,urlToImage,url,author,publishedAt,source:{name}})=>{
              return <div className='col-3' key = {url}>
                <NewsItem title={title} description={description} imageURl={urlToImage} newsUrl={url} author={author} date={publishedAt} source={name}/>
              </div>}
            )}
          </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}
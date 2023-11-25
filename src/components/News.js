import {useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  //const apiKey = process.env.REACT_APP_NEWS_API;
  const {keepProgress, pageSize=1, country, catagory} = props;

  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(false)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)
  function capatalised(cat){
    return cat.charAt(0).toUpperCase()+cat.slice(1);
  }

  async function update(pageNO){
    setLoading(true)
    let url= `https://newsapi.org/v2/top-headlines?country=${country}&category=${catagory}&apiKey=27f835bb27d147ff81f6e4486119b270&page=${pageNO}&pageSize=${pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json();

    setLoading((prev)=>false)
    setPage(pageNO)
    setArticles(pageNO===1 ? parseData.articles : [...articles, ...parseData.articles])
    setTotalResults(parseData.totalResults)
  }
  
  useEffect(()=>{
    document.title = catagory==='general'? 'NewsShots' :`${capatalised(catagory)}-NewsShots`
    keepProgress()
    update(page)
  },[])

  function fetchMoreData(){
    setTimeout(() => {
      update(page+1)
    }, 1000);
  };
  return (
    <>
      <h1 className='text-center' style={{margin: '35px',marginTop:'90px'}}>
        {catagory==='general'? 'Top Headlines' :`Top ${capatalised(catagory)} Headlines`}
      </h1>
      
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length!==totalResults}
        loader={<Spinner/>}
      >
      <div className="container my-3">
        <div className='row'>
          {articles.map(({title,description,urlToImage,url,author,publishedAt,source:{name: name1}})=>{
            return <div className='col-sm' key = {url}>
              <NewsItem title={title} description={description} imageURl={urlToImage} newsUrl={url} author={author} date={publishedAt} source={name1}/>
            </div>}
          )}
        </div>
      </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps={
  country:"in",
  pageSize:8,
  catagory:'general'
}

News.propTypes={
  country:PropTypes.string.isRequired,
  pageSize:PropTypes.number.isRequired,
  catagory:PropTypes.string.isRequired
}

export default News
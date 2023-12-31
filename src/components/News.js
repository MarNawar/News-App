import {useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import PropTypes from 'prop-types'
import GridNewsItem from './GridNewsItem'
import ListNewsItem from './ListNewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  //const apiKey = process.env.REACT_APP_NEWS_API;
  const {keepProgress, pageSize=1, country, catagory} = props;

  const location = useLocation();
  const navBarActive = location.pathname;
  // console.log(location, navBarActive);


  const [articles,setArticles] = useState([])
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)
  const [layout, setLayout] = useState('grid')

  function capatalised(cat){
    return cat.charAt(0).toUpperCase()+cat.slice(1);
  }

  async function update(pageNO){
    let url= `https://newsapi.org/v2/top-headlines?country=${country}&category=${catagory}&apiKey=5e9640aca1c84bbc8b07f284fad297cf&page=${pageNO}&pageSize=${pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json();

    setPage(pageNO)
    setArticles(pageNO===1 ? parseData.articles : [...articles, ...parseData.articles])
    setTotalResults(parseData.totalResults)
    // console.log(articles);
  }

// eslint-disable-next-line
  useEffect(()=>{
    document.title = catagory==='general'? 'NewsShots' :`${capatalised(catagory)}-NewsShots`
    keepProgress()
    update(page)

  },[])
// eslint-disable-next-line

  function changeLayout(){
    setLayout((prev)=>{
      if(prev==='grid')return 'layout';
      else return'grid';
    });
  }

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

      <button type="button" className="btn mx-5 btn-secondary" onClick={changeLayout}>{layout==='grid'?<i className="fa-solid fa-table-cells-large"></i>:<i className="fa-solid fa-bars"></i>}</button>
      
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length!==totalResults}
        loader={<Spinner/>}
      >
      {layout==='grid'?
      
      <div className="container my-3">
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-start'>

          
          {articles.map(({title,description,urlToImage,url,author,publishedAt,source:{name: name1},content})=>{
            return <div className='col' key = {url}>
              <GridNewsItem title={title} description={description} imageURl={urlToImage} newsUrl={url} author={author} date={publishedAt} source={name1} content={content} active={navBarActive} keepProgress={()=>keepProgress()} />
            </div>}
          )}


        </div>
      </div>
      :
      <div className="container my-3">
        <div className='row gy-4 justify-content-sm-center'>

          
          {articles.map(({title,description,urlToImage,url,author,publishedAt,source:{name: name1}, content})=>{
            return <div className='col-6 col-md-5' key = {url}>
              <ListNewsItem title={title} description={description} imageURl={urlToImage} newsUrl={url} author={author} date={publishedAt} source={name1} content={content} active={navBarActive}  keepProgress={()=>keepProgress()}/>
            </div>}
          )}

        </div>
      </div> 
      }
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

export default News;















// import {useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import GridNewsItem from './GridNewsItem'
// import ListNewsItem from './ListNewsItem'
// import Spinner from './Spinner';
// import InfiniteScroll from "react-infinite-scroll-component";

// function News(props) {
//   //const apiKey = process.env.REACT_APP_NEWS_API;
//   const {keepProgress, pageSize=1, country, catagory} = props;

//   const [articles,setArticles] = useState([])
//   const [loading,setLoading] = useState(false)
//   const [page,setPage] = useState(1)
//   const [totalResults,setTotalResults] = useState(0)
//   const [layout, setLayout] = useState('grid')

//   function capatalised(cat){
//     return cat.charAt(0).toUpperCase()+cat.slice(1);
//   }

//   async function update(pageNO){
//     setLoading(true)
//     let url= `https://newsapi.org/v2/top-headlines?country=${country}&category=${catagory}&apiKey=27f835bb27d147ff81f6e4486119b270&page=${pageNO}&pageSize=${pageSize}`;

//     let data = await fetch(url);
//     let parseData = await data.json();

//     setLoading((prev)=>false)
//     setPage(pageNO)
//     setArticles(pageNO===1 ? parseData.articles : [...articles, ...parseData.articles])
//     setTotalResults(parseData.totalResults)
//   }
  
//   useEffect(()=>{
//     document.title = catagory==='general'? 'NewsShots' :`${capatalised(catagory)}-NewsShots`
//     keepProgress()
//     update(page)
//   },[])

//   function fetchMoreData(){
//     setTimeout(() => {
//       update(page+1)
//     }, 1000);
//   };

//   function changeLayout(){
//     setLayout((prev)=>{
//       if(prev==='grid')return 'layout';
//       else return'grid';
//     });
//   }
//   return (
//     <>
//       <h1 className='text-center' style={{margin: '35px',marginTop:'90px'}}>
//         {catagory==='general'? 'Top Headlines' :`Top ${capatalised(catagory)} Headlines`}
//       </h1>
//       <button type="button" className="btn" onClick={changeLayout}>Favorite</button>
//       <button type="button" className="btn">List</button>

      
//       <InfiniteScroll
//         dataLength={articles.length}
//         next={fetchMoreData}
//         hasMore={articles.length!==totalResults}
//         loader={<Spinner/>}
//       >
//       {layout==='grid'?
      
//       <div className="container my-3">
//         <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-start'>

          
//           {articles.map(({title,description,urlToImage,url,author,publishedAt,source:{name: name1}})=>{
//             return <div className='col' key = {url}>
//               <GridNewsItem title={title} description={description} imageURl={urlToImage} newsUrl={url} author={author} date={publishedAt} source={name1}/>
//             </div>}
//           )}


//         </div>
//       </div>
//       :
//       <div className="container my-3">
//         <div className='row gy-0 justify-content-sm-center'>

          
//           {articles.map(({title,description,urlToImage,url,author,publishedAt,source:{name: name1}})=>{
//             return <div className='col-6 col-md-5' key = {url}>
//               <ListNewsItem title={title} description={description} imageURl={urlToImage} newsUrl={url} author={author} date={publishedAt} source={name1}/>
//             </div>}
//           )}

//         </div>
//       </div> 
//       }
//       </InfiniteScroll>
//     </>
//   )
// }

// News.defaultProps={
//   country:"in",
//   pageSize:8,
//   catagory:'general'
// }

// News.propTypes={
//   country:PropTypes.string.isRequired,
//   pageSize:PropTypes.number.isRequired,
//   catagory:PropTypes.string.isRequired
// }

// export default News
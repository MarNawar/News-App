import {BrowserRouter as Router, Route ,Routes} from 'react-router-dom'
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import About from './components/About'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress:0,
  };

  keepProgress(){
    setTimeout(() => {
      this.setState({progress:this.state.progress+20})
    }, 100);
    setTimeout(() => {
      this.setState({progress:this.state.progress+30})
    }, 300);
    setTimeout(() => {
      this.setState({progress:this.state.progress+50})
    }, 500); 
    setTimeout(() => {
      this.setState({progress:0})
    }, 750);  

  }
  

  render() {
    return (
      <Router>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <Routes>
          <Route exact path ='/' element={
            <>
              <News keepProgress={()=>this.keepProgress()}  key="general" pageSize={6} country='in' catagory='general'/>
            </>
          }></Route>
          <Route exact path ='business' element={
            <>
              <News keepProgress={()=>this.keepProgress()}  key="business" pageSize={6} country='in' catagory='business'/>
            </>
          }></Route>
          <Route exact path ='/sports' element={
            <>
              <News keepProgress={()=>this.keepProgress()}  key="sports" pageSize={6} country='in' catagory='sports'/>
            </>
          }></Route>
          <Route exact path ='/entertainment' element={
            <>
              <News keepProgress={()=>this.keepProgress()}  key="entertainment" pageSize={6} country='in' catagory='entertainment'/>
            </>
          }></Route>
          <Route exact path ='/science' element={
            <>
              <News keepProgress={()=>this.keepProgress()}  key="science" pageSize={6} country='in' catagory='science'/>
            </>
          }></Route>
          <Route exact path ='/health' element={
            <>
              <News keepProgress={()=>this.keepProgress()}  key="health" pageSize={6} country='in' catagory='health'/>
            </>
          }></Route>
          <Route exact path ='/about' element={
            <>
              <About/>
            </>
          }></Route>
        </Routes>
      </Router>
    )
  }
}


// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';

// export default class News extends Component {
//   constructor(){
//     super();
//     this.state = {
//       articles : [],
//       loading:false,
//       page:1,
//       totalPages:1,
//       disablePrev:true,
//       disableNext:false,
//     };
//   }

//   async update(pageNO){
//     this.setState({loading:true})
//     let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=5e9640aca1c84bbc8b07f284fad297cf&page=${pageNO}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parseData = await data.json();
//     //console.log(parseData)
//     this.setState({
//       page:pageNO,
//       articles: parseData.articles,
//       loading:false,
//       totalPages: Math.ceil(parseData.totalResults/this.props.pageSize)
//     })
//     console.log(pageNO,this.state.totalPages,parseData.totalResults)
//   }
  
//   componentDidMount(){
//     this.update(this.state.page)
//   }

//   handlePrevClick = async ()=>{

//     if(this.state.page <= 2){
//       this.setState({disablePrev:true})
//       this.setState({
//         disableNext:false,
//       })
//       this.update(this.state.page-1)
//     }
//     else{
//       this.setState({
//         disableNext:false,
//       })
//       this.update(this.state.page-1)
//     }
//   }

//   handleNextClick = async ()=>{

//     if(this.state.page >= this.state.totalPages-1){
//       this.setState({disableNext:true})
//       this.setState({
//         disablePrev:false,
//       })
//       this.update(this.state.page+1)
//     }
//     else{
//       this.setState({
//         disablePrev:false,
//       })
//       this.update(this.state.page+1)
//     }
//   }

  
//   render() {
//     if(this.state.loading === true){
//       return (
//         <Spinner/>
//       )
//     }
//       return (
//       <div className="container my-3">
//         <h1 className='text-center my-3'>Top Headlines</h1>
//         <div className='row'>
//           {this.state.articles.map(({title,description,urlToImage,url})=>{
//             return <div className='col-sm' key = {url}>
//               <News keepProgress={()=>this.keepProgress()} Item title={title} description={description} imageURl={urlToImage} newsUrl={url}/>
//             </div>}
//           )}
//         </div>
//         <div className='container d-flex justify-content-around my-3'>
//           <button type="button" className="btn btn-secondary" onClick={this.handlePrevClick} disabled={this.state.disablePrev}>prev</button>
//           <button type="button" className="btn btn-secondary" onClick={this.handleNextClick} disabled={this.state.disableNext}>next</button>
//         </div>
//       </div>
//     )
//   }
// }

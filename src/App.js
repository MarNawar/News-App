import {BrowserRouter as Router, Route ,Routes} from 'react-router-dom'
import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import About from './components/About'
import LoadingBar from 'react-top-loading-bar'

function App(){
  const [ progress, setProgress] = useState(0)

  function keepProgress(){
    setTimeout(() => {
      setProgress(prev=>prev+20)
    }, 100);
    setTimeout(() => {
      setProgress(prev=>prev+30)
    }, 300);
    setTimeout(() => {
      setProgress(prev=>prev+50)
    }, 600); 
    setTimeout(() => {
      setProgress(0)
    }, 750);  

  }

  return (
    <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
        <Route exact path ='/' element={
          <>
            <News keepProgress={()=>keepProgress()}  key="general" pageSize={6} country='in' catagory='general'/>
          </>
        }></Route>
        <Route exact path ='business' element={
          <>
            <News keepProgress={()=>keepProgress()}  key="business" pageSize={6} country='in' catagory='business'/>
          </>
        }></Route>
        <Route exact path ='/sports' element={
          <>
            <News keepProgress={()=>keepProgress()}  key="sports" pageSize={6} country='in' catagory='sports'/>
          </>
        }></Route>
        <Route exact path ='/entertainment' element={
          <>
            <News keepProgress={()=>keepProgress()}  key="entertainment" pageSize={6} country='in' catagory='entertainment'/>
          </>
        }></Route>
        <Route exact path ='/science' element={
          <>
            <News keepProgress={()=>keepProgress()}  key="science" pageSize={6} country='in' catagory='science'/>
          </>
        }></Route>
        <Route exact path ='/health' element={
          <>
            <News keepProgress={()=>keepProgress()}  key="health" pageSize={6} country='in' catagory='health'/>
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

export default App
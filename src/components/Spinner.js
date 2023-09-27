// import React, { Component } from 'react'
import loading from '../images/loading-gif.gif'

function Spinner() {
  return (
    // <div className="d-flex justify-content-center">
    //   <div className="spinner-border">
    //     <img src={loading} alt="loading"/>
    //   </div>
    // </div>
    <div className='container text-center'>
        {console.log("loading")}
        <img src={loading} alt="loading"/>
    </div>
  )
}

export default Spinner
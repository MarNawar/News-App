import React, { Component } from 'react'
export class NewsItem extends Component {
  render() {
    const {title, description, imageURl,newsUrl,author,date,source} = this.props;

    return (
      <>
        <div className="card my-3" style={{width: "18rem"}}>
          <img src={!imageURl?'https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg':imageURl} className="card-img-top" alt="..." height="200px"/>
          <div className="card-body">
            <h5 className="card-title">{title!==null?`${title.slice(0, 60)}...`: "...." } <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span></h5>
            <p className="card-text">{description!==null?`${description.slice(0, 120)}...`: "...." }</p>
            <p className="card-text"><small className="text-body-secondary"> By {author===null?"Unknown":author} on {date===null?"recent": new Date(date).toGMTString()  } </small></p>
            <a href={newsUrl} target="_blank" className="btn btn-primary" rel="noreferrer">Goto Source</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem
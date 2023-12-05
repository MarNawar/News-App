import { useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function NewsDetails({keepProgress}) {

  const location = useLocation()
  const {title, description, imageURl,newsUrl,author,date,source, active} = location.state;

  const navigate = useNavigate();
  function goBack(){
    navigate(active);
  }

  useEffect(()=>{
    keepProgress();
  },[])



  // console.log(title, description,imageURl,newsUrl,author,date, source)
  // console.log(location)
  return (
    <>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src={!imageURl?'https://as2.ftcdn.net/v2/jpg/03/24/14/35/1000_F_324143588_Jk9uwkSlhuSEyrGWkuQT7MM6mFbCayIj.jpg':imageURl} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">{title!==null?`${title}`: "...." }</h1>
            <p className="lead">{description!==null?`${description}`: "..............................................................................................................................................................................................................................................." }</p>
            <p className="card-text"><small className="text-body-secondary"> By {author===null?"Unknown":author} on {date===null?"recent": new Date(date).toGMTString()  } </small></p>
            <p className="card-text"><strong className="text-body-secondary">Source: {source===null?"Unknown":source} </strong></p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <a target="_blank" className="btn btn-primary btn-lg px-4 me-md-2" href={newsUrl}>Go to Source</a>
              <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={goBack}>Back</button>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="card my-3" style={{width: "18rem"}}>
        <img src={!imageURl?'https://as2.ftcdn.net/v2/jpg/03/24/14/35/1000_F_324143588_Jk9uwkSlhuSEyrGWkuQT7MM6mFbCayIj.jpg':imageURl} className="card-img-top" alt="..." height="200px"/>
        <div className="card-body">
          <h5 className="card-title">{title!==null?`${title}`: "...." } <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'85%',zIndex:'1'}}>{source}</span></h5>
          <p className="card-text fs-9">{description!==null?`${description}`: "..............................................................................................................................................................................................................................................." }</p>
          <p className="card-text"><small className="text-body-secondary"> By {author===null?"Unknown":author} on {date===null?"recent": new Date(date).toGMTString()  } </small></p>
          <a href={newsUrl} target="_blank" className="btn btn-primary" rel="noreferrer">Goto Source</a>
        </div>
      </div> */}
    </>
          
      
  )
}

export default NewsDetails
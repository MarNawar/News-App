import { useNavigate } from 'react-router-dom';

function ListNewsItem(props){
  const {title, description, imageURl,newsUrl,author,date,source, active} = props;
  const navigate = useNavigate();
  function navigateTo(){
    navigate("/NewsDetail", {state: {title, description, imageURl,newsUrl,author,date,source, active} });
  }
  return (
    <>
      <div className="card mb-0" style={{maxWidth: '540px'}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={!imageURl?'https://as2.ftcdn.net/v2/jpg/03/24/14/35/1000_F_324143588_Jk9uwkSlhuSEyrGWkuQT7MM6mFbCayIj.jpg':imageURl} className="img-fluid rounded-start" alt="..."/>
            <button className="btn btn-primary my-5 mx-4" onClick={navigateTo} >See Details</button>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title!==null?`${title.slice(0, 50)}...`: "...." }<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', top:'1%',zIndex:'1'}}>{source}</span></h5>
              <p className="card-text fs-9">{description!==null?`${description.slice(0, 70)}...`: "......................................................................................................................." }</p>
              <p className="card-text"><small className="text-body-secondary fs-9">By {author===null?"Unknown":author}</small></p>
              <p className="card-text"><small className="text-body-secondary fs-9">On {date===null?"recent": new Date(date).toGMTString()}</small></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListNewsItem
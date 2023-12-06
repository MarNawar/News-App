import { useNavigate } from 'react-router-dom';

function GridNewsItem( props ){
  const {title, description, imageURl,newsUrl,author,date,source,content,active} = props;
  const navigate = useNavigate();
  function navigateTo(){
    navigate("/NewsDetail", {state: {title, description, imageURl,newsUrl,author,date,source,content, active} });
  }
  return (
    <>
      <div className="card my-3" style={{width: "18rem"}}>
        <img src={!imageURl?'https://as2.ftcdn.net/v2/jpg/03/24/14/35/1000_F_324143588_Jk9uwkSlhuSEyrGWkuQT7MM6mFbCayIj.jpg':imageURl} className="card-img-top" alt="..." height="200px"/>
        <div className="card-body">
          <h5 className="card-title">{title!==null?`${title.slice(0, 60)}...`: "...." } <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'85%',zIndex:'1'}}>{source}</span></h5>
          <p className="card-text fs-9">{description!==null?`${description.slice(0, 120)}...`: "..............................................................................................................................................................................................................................................." }</p>
          <p className="card-text"><small className="text-body-secondary"> By {author===null?"Unknown":author} on {date===null?"recent": new Date(date).toGMTString()  } </small></p>
          <button className="btn btn-primary" onClick={navigateTo} >See Details</button>

        </div>
      </div>
    </>
  )
}

export default GridNewsItem
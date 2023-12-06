import loading from '../images/loading-gif.gif'

function Spinner() {
  return (
    <div className='container text-center'>
        <img src={ loading } alt="loading" className='my-5'/>
    </div>
  )
}

export default Spinner

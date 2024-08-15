import "./card.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons"

function Card(props){

    return(
        <>
        <div className="card cardParent" style={{width: "18rem"}}>
       
  <img className="rounded mx-auto d-block pt-2 " style={{width: "150px", height: "150px"}} src={props.img} alt=".."/>
 <a href="."> <FontAwesomeIcon className="icon1" icon={ faHeart} /></a>
  <div className="card-body">
  <h5 className="card-title text-center">{props.category}</h5>
    <h5 className="card-title text-center">{props.title}</h5>
    <p className="card-text">{props.description}</p>
    <p > <strong className="card-text text-danger">${props.price}</strong > </p>

    
    {/* <div className=" "  style={{ position:"relative"}}>

    <div className="d-flex " style={{position:"absolute",zIndex:"0"}}> 
    <FontAwesomeIcon className="star text-dark" icon={faStar} />
    <FontAwesomeIcon className="star text-dark" icon={faStar} />
    <FontAwesomeIcon className="star text-dark" icon={faStar} />
    <FontAwesomeIcon className="star text-dark" icon={faStar} />
    <FontAwesomeIcon className="star text-dark" icon={faStar} />
    </div>

    <div  className="rateDive" style={{width: (props.rating * 75 )/ 5, position:"relative",bottom:"0px",zIndex:"1000"}}>
    <div className="d-flex" style={{width: "75px",position:"absolute"}}>
    <FontAwesomeIcon className="star" icon={faStar} />
    <FontAwesomeIcon className="star" icon={faStar} />
    <FontAwesomeIcon className="star" icon={faStar} />
    <FontAwesomeIcon className="star" icon={faStar} />
    <FontAwesomeIcon className="star" icon={faStar} />
    </div>
   
   
    </div>
    </div> */}

    
<div className="rating-container" style={{ position: "relative" }}>
  <div className="stars-background d-flex" style={{ position: "absolute", zIndex: 0 }}>
    {[...Array(5)].map((_, index) => (
      <FontAwesomeIcon key={index} className="star text-dark" icon={faStar} />
    ))}
  </div>

  <div className="stars-foreground rateDive" style={{ width: `${(props.rating * 75) / 5}px`, position: "relative", zIndex: 1 }}>
    <div className="d-flex" style={{ width: "75px" }}>
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon key={index} className="star text-warning" icon={faStar} />
      ))}
    </div>
  </div>
</div>

  </div>

  </div>
  {/* </div> */}


        </>
    )



}

export default Card
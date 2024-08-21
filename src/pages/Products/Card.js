import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// function Card(props){
function Card({
  category,
  img,
  title,
  description,
  price,
  rating,
  onWishlistToggle,
  onCartToggle,
  isInWishlist,
  isInCart,
}) {
  const [isliked, setisLike] = useState(false);

  const handleClick = () => {
    setisLike(!isliked);
  };

  return (
    <>
      <div
        className="card cardParent"
        style={{ width: "18rem", position: "relative" }}>
        <img
          className="rounded mx-auto d-block pt-2 "
          style={{ width: "150px", height: "150px" }}
          src={img}
          alt=".."
        />

        <button
          onClick={onWishlistToggle}
          className={`heartbtn ${isInWishlist ? "text-danger" : ""}`}
          style={{
            position: "absolute",
            top: "30px",
            right: "20px",
            border: "none",
          }}>
          {" "}
          <FontAwesomeIcon
            onClick={() => handleClick()}
            className="icon1
            
            "
            icon={faHeart}
          />
        </button>
        <button
          onClick={onCartToggle}
          className={`cartbtn ${isInCart ? "text-danger" : ""}`}
          style={{
            position: "absolute",
            top: "70px",
            right: "20px",
            border: "none",
          }}>
          {" "}
          <FontAwesomeIcon
            // style={{ color: isliked ? "red" : "gray" }}
            // onClick={() => handleClick()}
            className="icon1
            
            "
            icon={faCartShopping}
          />
        </button>

        <div className="card-body">
          <h5 className="card-title text-center">{category}</h5>
          <h5 className="card-title text-center">{title}</h5>
          <p className="card-text">{description}</p>
          <p>
            {" "}
            <strong className="card-text text-danger">${price}</strong>{" "}
          </p>

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
            <div
              className="stars-background d-flex"
              style={{ position: "absolute", zIndex: 0 }}>
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  className="star text-dark"
                  icon={faStar}
                />
              ))}
            </div>

            <div
              className="stars-foreground rateDive"
              style={{
                width: `${(rating * 75) / 5}px`,
                position: "relative",
                zIndex: 1,
              }}>
              <div className="d-flex" style={{ width: "75px" }}>
                {[...Array(5)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    className="star text-warning"
                    icon={faStar}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Card;

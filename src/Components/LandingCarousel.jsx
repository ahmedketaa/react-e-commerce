import React from 'react';
import { Carousel } from 'react-bootstrap';

function LandingCarousel() {
    return (
        <Carousel> 
          <Carousel.Item style={{height:"350px"}} className='bg-dark'>
          <div className="row">
                <div className="col-md-4">
                <Carousel.Caption style={{float:"left" ,textAlign:"left" , marginBottom:"22px"}}>
                <h3>Up to 10% off Voucher</h3>
                <button className='btn btn-info mt-3'>Shop Now</button>
                </Carousel.Caption>
                </div>
                <div className="col-md-8">
                <img
                className="d-block w-100"
                src="assets/carousel-Image-removebg.png"
                alt="First slide"
                />
                </div>
            </div>
          </Carousel.Item>
    
          <Carousel.Item style={{height:"350px"}} className='bg-dark'>
          <div className="row">
                <div className="col-md-4 " >
                <Carousel.Caption style={{float:"left" ,textAlign:"left" , marginBottom:"22px"}}>
                <h3>Enjoy Your Time With Our Products</h3>
                <button className='btn btn-info mt-3'>Shop Now</button>
                </Carousel.Caption>
                </div>
                <div className="col-md-8">
                <img
                className="d-block w-100"
                src="assets/landing2.png"
                alt="First slide"
                style={{objectFit:"cover"}}
                />
           
                </div>
            </div>
          </Carousel.Item>
    
          <Carousel.Item style={{height:"350px"}} className='bg-dark'>
          <div className="row">
                <div className="col-md-4">
                <Carousel.Caption style={{float:"left" ,textAlign:"left" , marginBottom:"22px"}}>
                <h3> New Products Collection</h3>
                <button className='btn btn-info mt-3'>Shop Now</button>
                </Carousel.Caption>
                </div>
                <div className="col-md-8">
                <img
                className="d-block w-100"
                src="assets/landing.png"
                alt="First slide"
                style={{objectFit:"cover"}}
                />
           
                </div>
            </div>
          </Carousel.Item>
        </Carousel>
      );
}

export default LandingCarousel;

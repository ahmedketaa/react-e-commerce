import React from 'react';
import { Carousel } from 'react-bootstrap';

function LandingCarousel() {
    return (
        <Carousel> 
          <Carousel.Item style={{height:"350px"}} className='bg-dark'>
          <div className="row">
                <div className="col-md-4">
                <Carousel.Caption>
                <h3>First Slide Label</h3>
                <button className='btn btn-info'>Shop Now</button>
                </Carousel.Caption>
                </div>
                <div className="col-md-8">
                <img
                className="d-block w-100"
                src="assets/landing.png"
                alt="First slide"
                />
                </div>
            </div>
          </Carousel.Item>
    
          <Carousel.Item style={{height:"350px"}} className='bg-dark'>
          <div className="row">
                <div className="col-md-4">
                <Carousel.Caption>
                <h3>Second Slide Label</h3>
                <button className='btn btn-info'>Shop Now</button>
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
    
          {/* <Carousel.Item style={{height:"350px"}}>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Third+Slide"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third Slide Label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>
      );
}

export default LandingCarousel;

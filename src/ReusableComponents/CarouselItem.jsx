import React from 'react';
import { Carousel } from 'react-bootstrap';

function CarouselItem() {
  return (
    <>
     <Carousel.Item style={{height:"350px"}} className='bg-dark'>
          <div className="row">
                <div className="col-md-4">
                <Carousel.Caption>
                <h3>Firsttt Slide Label</h3>
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
    </>
  );
}

export default CarouselItem;

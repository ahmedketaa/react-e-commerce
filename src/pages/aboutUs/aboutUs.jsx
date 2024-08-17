import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AboutCard from '../../ReusableComponents/AboutCard';

const AboutUs = () => {
    return (
        <div className="container my-5">
           <div className="section-1 d-flex justify-content-center gap-3 align-items-center">
            <div className="text " style={{width:"48%"}}>
                <h2 className='mb-4'>Our Story</h2>
                <p className=''  style={{width:"80%"}}>
                    Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 
                    
                </p>
                <p>
                    Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.

                </p>
            </div>
            <div className="image"  style={{width:"48%"}}>
                <img className='w-100' src="assets/about.png" alt="" />
            </div>
           </div>
        <div style={{marginTop:"100px"}} className="section-2  d-flex justify-content-around gap-2">
                <AboutCard />
                <AboutCard />
                <AboutCard />
                <AboutCard />
            </div>                            
        </div>
    );
};

export default AboutUs;

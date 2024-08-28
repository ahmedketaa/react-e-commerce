import React, { useEffect } from 'react';
import LandingCarousel from '../../Components/LandingCarousel';
import ProductsCategory from '../../Components/ProductsCategory';
import FlashSales from '../../Components/FlashSales';
import CategoriesSection from '../../Components/CategoriesSection';
import BestSelling from '../../Components/BestSelling';

function Home() {
  

  return (
    <>
    <div className="container">
     <div className="row my-4">
        <div className="col-md-3">
            <ProductsCategory/>
        </div>
        <div className='col-md-8'>
        <LandingCarousel />
        </div>
    </div>
        <div className="flash-section container">
            <FlashSales/>
        </div>
        <div className="categories-section">
          <CategoriesSection />
        </div>
        <div className="best-sells mt-5">
          <BestSelling />
        </div>
    </div>
    </>
  );
}

export default Home;

import React, { useEffect } from 'react';
import LandingCarousel from '../../Components/LandingCarousel';
import ProductsCategory from '../../Components/ProductsCategory';
import FlashSales from '../../Components/FlashSales';
import CategoriesSection from '../../Components/CategoriesSection';
import BestSelling from '../../Components/BestSelling';

function Home() {
  const updateProductQuantity = async (productId) => {
    try {

        await fetch(`http://localhost:8000/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: 13 }),
        });
        console.log("updated");
        
    } catch (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }
};
useEffect(() => {
  // updateProductQuantity(1)
}, [])

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


import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Products } from '../Utilities/AllProducts';
import { Rating } from "primereact/rating";

export default function ProductSlider() {

    const [products, setProducts] = useState(Products);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    useEffect(() => {
       setProducts(products.slice(0, 9));
    }, [products]);
    const productTemplate = (product) => {
        return (
            <div style={{minHeight:"400px" ,position:"relative"}} className="border-1 mt-2   border-round  text-center  px-3 ">
                <div className="mb-2 rounded d-flex justify-content-center align-items-center" style={{width:"100%", height:"250px" ,background:"#F5F5F5"}}>
                    <img src={`${product.image}`} alt={product.name} className=" shadow-2" />
                </div>
                <div className='p-2' style={{ textAlign:'left'}}>
                    <h6 className="mb-1  text-bold" style={{height:"", overflow:"hidden"}}>{product.name}</h6>
                    <p style={{color:"#DB4444"}} className="mt-2 mb-3">${Math.round(product.price)}</p>
                    <div className="mt-2 d-flex custom-rating flex-wrap gap-2 ">
                    <Rating value={3} readOnly disabled cancel={false}/>
                    </div>
                    {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                    <i className='pi pi-heart  custom-heart-icon' ></i>
                    <i className='pi pi-shopping-cart  custom-heart-icon' style={{top:"55px"}}></i>
                   
                   
                </div>
            </div>
        );
    };

    return (
        <div className="">
            <Carousel 
                value={products} 
                numScroll={1} 
                numVisible={4} 
                responsiveOptions={responsiveOptions} 
                itemTemplate={productTemplate} 
                
            />
        </div>
    );
}
        
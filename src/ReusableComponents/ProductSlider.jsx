import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'primereact/carousel';
import { Rating } from "primereact/rating";
import api from "../api/products";
import { toggleCartItem, getCart } from '../Utlities/CartServices';
import { Toast } from 'primereact/toast';

export default function ProductSlider() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const toast = useRef(null);
    const userId = 1; 

    useEffect(() => {
        api.get("/products").then(res => {
            setProducts(res.data);
        }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        getCart(userId).then(data => {
            setCart(data);
        }).catch(error => console.error('Error fetching cart:', error));
    }, [userId]);

    const isProductInCart = (productId) => {
        return cart.some(item => item.id === productId);  // Ensure `item.id` matches `productId`
    };

    const handleToggleCart = (product, quantity) => {
        const productId = product.id;
        const inCart = isProductInCart(productId);

        toggleCartItem(userId, product, quantity)
            .then(() => getCart(userId))
            .then(data => {
                setCart(data);
                toast.current.show({
                    severity: inCart ? 'error' : 'success',
                    summary: 'Success',
                    detail: inCart ? 'Item removed from cart' : 'Item added to cart',
                    life: 3000
                });
            })
            .catch(error => console.error('Error toggling cart item:', error));
    };

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

    const productTemplate = (product) => {
        const isInCart = isProductInCart(product.id);

        return (
            <div key={product.id} style={{ minHeight: "400px", position: "relative" }} className="border-1 mt-2 border-round text-center px-3">
                <div className="mb-2 rounded d-flex justify-content-center align-items-center" style={{ width: "100%", height: "250px", background: "#F5F5F5" }}>
                    <img src={`${product.image}`} alt={product.title} className="shadow-2 w-50" />
                </div>
                <div className='p-2' style={{ textAlign: 'left' }}>
                    <h6 className="mb-1 text-bold" style={{ height: "", overflow: "hidden" }}>{product.title}</h6>
                    <p style={{ color: "#DB4444" }} className="mt-2 mb-3">${Math.round(product.price)}</p>
                    <div className="mt-2 d-flex custom-rating flex-wrap gap-2">
                        <Rating value={Math.ceil(product.rating.rate)} readOnly disabled cancel={false} />({product.rating.count})
                    </div>
                    <i className='pi pi-heart custom-heart-icon'></i>
                    <i
                        className={`pi pi-shopping-cart custom-heart-icon ${isInCart ? 'in-cart' : ''}`}
                        style={{ top: "55px" }}
                        onClick={() => handleToggleCart(product, 1)} 
                    ></i>
                </div>
            </div>
        );
    };

    return (
        <div className="">
            <Toast ref={toast} />
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

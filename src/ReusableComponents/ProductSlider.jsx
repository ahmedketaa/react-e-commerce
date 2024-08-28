// ProductSlider.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Carousel } from 'primereact/carousel';
import { Rating } from 'primereact/rating';
import api from '../api/products';
import { toggleCartItem, getCart, updateProductQuantityAfterPurchase } from '../Utlities/CartServices';
import { Toast } from 'primereact/toast';
import { getWishlist, toggleWishlistItem } from '../Utlities/WishlistServices';
import { CartContext } from '../Context/cartContext';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import { Tag } from 'primereact/tag';

export default function ProductSlider() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const toast = useRef(null);
    const { updateCartCount, updateWishlistCount } = useContext(CartContext);
    const { cartItemCount, wishlistItemCount } = useContext(CartContext);

    const { auth } = useAuth()
     localStorage.getItem("active-user")    
    const navigate = useNavigate()
    const userId = JSON.parse(localStorage.getItem("active-user"))&& JSON.parse(localStorage.getItem("active-user")).id;
    
    const getProducts = () => {
        api.get('/products').then(res => {
            setProducts(res.data);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getProducts();
    }, []);

    const showCart = () => {
        getCart(userId).then(data => {
            setCart(data);
        }).catch(error => console.error('Error fetching cart:', error));
    };

    const showWishlist = () => {
        getWishlist(userId).then(data => {
            setWishlist(data);
        }).catch(error => console.error('Error fetching wishlist:', error));
    };

    useEffect(() => {
        showCart();
        showWishlist();
    }, [userId,cartItemCount,wishlistItemCount ]);
    
    const isProductInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    const isProductInWishlist = (productId) => {
        return wishlist?.some(item => item.id === productId);
    };


   

    const handleToggleCart = (product, quantity) => {
        if(auth.user){ 
            const productId = product.id;
            const inCart = isProductInCart(productId);
            toggleCartItem(userId, product, quantity)
                .then(() => getCart(userId))
                .then(data => {
                    setCart(data);
                    updateCartCount(); 
                    toast.current.show({
                        severity: inCart ? 'error' : 'success',
                        summary: 'Success',
                        detail: inCart ? 'Item removed from cart' : 'Item added to cart',
                        life: 3000
                    });
                })
                .then(()=> {
                    
                    updateProductQuantityAfterPurchase(userId,productId,quantity)
                } 
                )
                .catch(error => console.error('Error toggling cart item:', error))
                .finally(getProducts());
        }else { 
            navigate("/login")
        }
       
    };

    const handleToggleWishlist = (product) => {
        const productId = product.id;
        const inWishlist = isProductInWishlist(productId);
        if(auth.user) { 
             toggleWishlistItem(userId, product)
             .then(() => getWishlist(userId))
            .then(data => {
                setWishlist(data);
                updateWishlistCount(); 
                toast.current.show({
                    severity: inWishlist ? 'error' : 'success',
                    summary: 'Success',
                    detail: inWishlist ? 'Item removed from wishlist' : 'Item added to wishlist',
                    life: 3000
                });
            })
            .catch(error => console.error('Error toggling wishlist item:', error))
            .finally(getProducts());
        }else{ 
            navigate("/login")
        }
        
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
        
        const getSeverity = (quantity) => {
            if (quantity === 0) {
                return 'danger'; // Out of stock
            } else if (quantity <= 5) {
                return 'warning'; // Low stock
            } else {
                return 'success'; // In stock
            }
        };
        const isInCart = isProductInCart(product.id);
        const isInWishlist = isProductInWishlist(product.id);
        const availableQuantity = product.quantity || 0; 
        const severity = getSeverity(availableQuantity);
        return (
            <div key={product.id} style={{ minHeight: '400px', position: 'relative' }} className="border-1 mt-2 border-round text-center px-3">
                <div className="mb-2 rounded d-flex justify-content-center align-items-center" style={{ width: '100%', height: '250px', background: '#F5F5F5' }}>
                    <img src={`${product.image}`} alt={product.title} className="shadow-2 w-50" />
                </div>
                <div className="p-2" style={{ textAlign: 'left' }}>
                    <h6 className="mb-1 text-bold" style={{ height: '', overflow: 'hidden' }}>{product.title}</h6>
                    <p style={{ color: '#DB4444' }} className="mt-2 mb-3">${Math.round(product.price)}</p>
                    
                    <div className="mt-2 d-flex custom-rating flex-wrap gap-2">
                        <Rating value={Math.ceil(product.rating.rate)} readOnly disabled cancel={false} />({product.rating.count})
                    </div>
                    <p className='mt-2'>
                          <Tag
                        severity={severity}
                        value={severity==='success'? "INSTOCK": severity==='warning'?"LOWSTOCK":"OUTOFSTOCK"}
                    /></p>
                    <i 
                        className={`pi pi-heart custom-heart-icon ${isInWishlist &&auth?.user ? 'in-cart' : ''}`}
                        onClick={() => handleToggleWishlist(product)}
                    ></i>
                    <i
                        className={`pi pi-shopping-cart custom-heart-icon ${isInCart &&auth?.user  ? 'in-cart' : ''}`}
                        style={{ top: '55px' }}
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

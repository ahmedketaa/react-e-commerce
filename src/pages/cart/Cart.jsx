import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { getCart, toggleCartItem, updateCartItem, updateProductQuantityAfterPurchase } from '../../Utlities/CartServices';
import { Toast } from 'primereact/toast';
import { CartContext } from '../../Context/cartContext';
import { getProductById } from '../../Utlities/ProductServices';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import useAuth from '../../hooks/useAuth';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const toast = useRef(null);
    const [quantity, setQuantity] = useState(false);
    const { updateCartCount } = useContext(CartContext);
    const { auth } = useAuth()
    const userId = auth.user.id
    console.log("hii",userId);
    
    const navigate = useNavigate(); 

    useEffect(() => {
        getCart(userId).then(data => {
            setCartItems(data);
            console.log(data);
        }).catch(error => console.error('Error fetching cart:', error));
    }, [userId]);

    const confirmDeleteItem =(product)=>{
        confirmDialog({
            message: 'Are you sure you want to delete this Item?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger ',
            accept: () => handleRemoveItem(product), 
            reject:'' 
        });
    }
   

    const handleRemoveItem = (product) => {

        toggleCartItem(userId, product, -1)
            .then(() => getCart(userId))
            .then(data => {
                updateCartCount()
                setCartItems(data);
                toast.current.show({
                    severity: 'error',
                    summary: 'Removed',
                    detail: 'Item removed from cart',
                    life: 3000
                });
            })
            .catch(error => console.error('Error removing item:', error));
    };

    const handleQuantityChange =async (product, delta) => {
        const item = cartItems.find(item => item.id === product.id);
        const mainProd =await getProductById(product.id)
            
        if (item) {
            if (delta===-1 ){
                const newQuantity = item.quantity + delta;
                updateCartItem(userId, product, newQuantity)
                    .then(() => getCart(userId))
                    .then(data => {
                        setCartItems(data);
                        updateCartCount();
                        setQuantity(!quantity);
                        updateProductQuantityAfterPurchase(userId, product.id, delta);
                    })
                    .catch(error => console.error('Error updating quantity:', error));
            }
             else if(delta === 1 && mainProd.quantity > 0){
                const newQuantity = item.quantity + delta;
                updateCartItem(userId, product, newQuantity)
                    .then(() => getCart(userId))
                    .then(data => {
                        setCartItems(data);
                        updateCartCount();
                        setQuantity(!quantity);
                        updateProductQuantityAfterPurchase(userId, product.id, delta);
                    })
                    .catch(error => console.error('Error updating quantity:', error));
            
            }else{
                toast.current.show({
                    severity: 'error',
                    summary: 'OUTOFSTOCK',
                    detail: 'Max Quantity Number',
                    life: 3000
                });
            }
  
        }else{
            toast.current.show({
                severity: 'error',
                summary: 'OUTOFSTOCK',
                detail: 'Max Quantity Number',
                life: 3000
            });
        }
    }
    

    const calculateSubtotal = (price, quantity) => price * quantity;
    const calculateTotalPrice = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const totalPrice = calculateTotalPrice(cartItems);

    return (
        <div className='container' style={{ minHeight: "90vh" }}>
            <Toast ref={toast} />
            <ConfirmDialog />
            {cartItems.length === 0 ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                    textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '2rem', color: '#DB4444' }}>Your cart is empty</h2>
                    <p style={{ fontSize: '1rem', marginBottom: '20px' }}>You have no items in your cart. Start shopping now!</p>
                    <button onClick={() => navigate('/products')} style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        backgroundColor: '#DB4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}>
                        Shop Now!
                    </button>
                </div>
            ) : (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                        gap: '10px',
                        padding: '30px 10px',
                        borderRadius: '8px',
                        margin: "50px 0 30px",
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}>
                        <div style={{ textAlign: 'center' }}>Product</div>
                        <div style={{ textAlign: 'center' }}>Price</div>
                        <div style={{ textAlign: 'center' }}>Quantity</div>
                        <div style={{ textAlign: 'center' }}>Sub Total</div>
                        <div style={{ textAlign: 'center' }}>Actions</div>
                    </div>

                    <div className="scroll-div">
                        {cartItems.map(item => (
                            <div key={item.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                                gap: '10px',
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                borderBottom: "2px solid #DB4444"
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <img src={item.image} alt={`Product ${item.id}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    ${item.price}
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <button onClick={() => handleQuantityChange(item, -1)} style={{ marginRight: '5px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>-</button>
                                    {item.quantity}
                                    <button onClick={() => handleQuantityChange(item, 1)} style={{ marginLeft: '5px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>+</button>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <button onClick={() => confirmDeleteItem(item)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <i className="pi pi-trash" style={{ fontSize: '1.5em', color: '#DB4444' }}></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary-card">
                        <h2>Cart Summary</h2>
                        <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
                        <button className="checkout-button" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
}

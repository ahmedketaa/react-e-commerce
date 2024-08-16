import React, { useEffect, useRef, useState } from 'react';
import { getCart, toggleCartItem, updateCartItem } from '../../Utlities/CartServices';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const toast = useRef(null);
    const [quantity, setQuantity] = useState(false)
    const userId = 1;

    useEffect(() => {
        getCart(userId).then(data => {
            setCartItems(data);
            console.log(data);
        }).catch(error => console.error('Error fetching cart:', error));
    }, [userId]);

  
    const handleRemoveItem = (productId) => {
        toggleCartItem(userId, productId)
            .then(() => getCart(userId))
            .then(data => setCartItems(data))
            .then(() => toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Item removed from cart',
                life: 3000
            }))
            .catch(error => console.error('Error removing item:', error));
    };

    const handleQuantityChange = (product, delta) => {
        
        const item = cartItems.find(item => item.id === product.id);
        if (item) {
            const newQuantity =  item.quantity + delta;
            updateCartItem(userId, product, newQuantity )
                .then(() => getCart(userId))
                .then(data => {
                    setCartItems(data)
                    console.log("new data",data);
                    setQuantity(!quantity)
                    
        })
                .catch(error => console.error('Error updating quantity:', error));
        }
    };

    const calculateSubtotal = (price, quantity) => price * quantity;
    const calculateTotalPrice = (cartItems) => {
        return cartItems.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      };
      const totalPrice = calculateTotalPrice(cartItems);
console.log('Total Price: $', totalPrice);

    return (
        <div className='container' style={{ minHeight: "90vh" }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
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
            </div>

            {/* Table Items */}
            <div className="scroll-div">
                {cartItems.map(item => (
                    <div key={item.id} style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
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
                            <button onClick={() => handleQuantityChange(item, -1)} style={{ marginRight: '5px', padding:"",border:"none" }}>-</button>
                            {item.quantity}
                            <button onClick={() => handleQuantityChange(item, 1)} style={{ marginLeft: '5px',border:"none" }}>+</button>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
            <div class="cart-summary-card">
                <h2>Cart Summary</h2>
                <div class="total-price">Total Price: ${totalPrice}</div>
                <button class="checkout-button">Process to Checkout</button>
                </div>
        </div>
    );
}

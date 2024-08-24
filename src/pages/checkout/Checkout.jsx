import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { clearCart, getCart } from '../../Utlities/CartServices';
import MainButton from '../../ReusableComponents/MainButton';
import { Toast } from 'primereact/toast';


const stripePromise = loadStripe('pk_test_51Pocw9P8naSBg9OwVJjLj7L2MG3b9atQH3bkeFb3tCgMVgHQsnF9oNYwlBInor962LGIgZXzc63vt21tOOVF63EZ00Zeg3G3K5');

export default function Checkout() {
    const coupons = {
        'KETA': 10, 
        'SAVE20': 20, 
    };
    
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        streetName: '',
        companyName: '',
        city: '',
        phoneNumber: '',
        email: '',
        saveInfo: false,
        coupon: '',
    });
    const [discount, setDiscount] = useState(0);
    const [errors, setErrors] = useState({});
    const toast = React.useRef(null);

    const userId = JSON.parse(localStorage.getItem("active-user"))&& JSON.parse(localStorage.getItem("active-user")).id;

    useEffect(() => {
        getCart(userId).then(data => {
            setCartItems(data);
            const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotalPrice(total.toFixed(2));
        }).catch(error => console.error('Error fetching cart:', error));
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.streetName) newErrors.streetName = 'Street Name is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const applyCoupon = () => {
        const couponCode = formData.coupon.toUpperCase();
        if (coupons[couponCode]) {
            const discountAmount = (totalPrice * coupons[couponCode]) / 100;
            setDiscount(discountAmount);
            toast.current.show({ severity: 'success', summary: 'Coupon Applied', detail: `Discount: $${discountAmount.toFixed(2)}`, life: 3000 });
        } else {
            setDiscount(0);
            toast.current.show({ severity: 'error', summary: 'Invalid Coupon', detail: 'Coupon code is not valid.', life: 3000 });
        }
    };

    const handleCheckout = async () => {
        if (!validateForm()) return;

        const orderData = {
            userId,
            cartItems,
            totalPrice: (parseFloat(totalPrice) - discount).toFixed(2),
            shippingDetails: formData,
        };
        try {
            const response = await fetch('https://react-e-commerce-json-server-jhau.vercel.app/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            // const order = await response.json();
            toast.current.show({ severity: 'success', summary: 'order placed', detail: `Order placed successfully`, life: 3000 });

                clearCart(userId)
           
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
                lineItems: [
                    {
                        price: 'price_1Pod9QP8naSBg9OwGQCOu44Q', 
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                successUrl: `${window.location.origin}/success`,
                cancelUrl: `${window.location.origin}/cancel`,
            });

            if (error) {
                console.error("Stripe checkout error:", error);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };


    const finalTotalPrice = (parseFloat(totalPrice) - discount).toFixed(2);

    return (
        <div className="container d-flex gap-4 justify-content-between mt-2 p-3">
            <Toast ref={toast} />
            <div className="checkout-form" style={{ width: '40%' }}>
                <h2>Billing Information</h2>
                <form>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Full Name</label>
                        <input
                            className='form-control mt-1 py-2'
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            style={{ width: '100%', background: "#F5F5F5" }}
                        />
                        {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Street Name</label>
                        <input
                            className='form-control mt-1 py-2'
                            type="text"
                            name="streetName"
                            value={formData.streetName}
                            onChange={handleInputChange}
                            placeholder="Street Name"
                            style={{ width: '100%', background: "#F5F5F5" }}
                        />
                        {errors.streetName && <small className="text-danger">{errors.streetName}</small>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Company Name (Optional)</label>
                        <input
                            className='form-control mt-1 py-2'
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Company Name"
                            style={{ width: '100%', background: "#F5F5F5" }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>City</label>
                        <input
                            className='form-control mt-1 py-2'
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            style={{ width: '100%', background: "#F5F5F5" }}
                        />
                        {errors.city && <small className="text-danger">{errors.city}</small>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Phone Number</label>
                        <input
                            className='form-control mt-1 py-2'
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            style={{ width: '100%', background: "#F5F5F5" }}
                        />
                        {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email</label>
                        <input
                            className='form-control mt-1 py-2'
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            style={{ width: '100%', background: "#F5F5F5" }}
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            <input
                                className='me-2'
                                type="checkbox"
                                name="saveInfo"
                                checked={formData.saveInfo}
                                onChange={handleInputChange}
                            />
                            Save my info for future purchases
                        </label>
                    </div>
                </form>
            </div>

            <div className="checkout-summary" style={{ width: '45%', padding: '20px', borderRadius: '8px' }}>
                <h2>Order Summary</h2>
                <div className="cart-items scroll-div py-3 rounded" style={{ maxHeight: '300px', overflowY: 'scroll', marginBottom: '20px' }}>
                    <div style={{ marginBottom: '15px', display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        <span>Image</span>
                        <span>Name</span>
                        <span>Price</span>
                        <span>Quantity</span>
                    </div>
                    {cartItems.map(item => (
                        <div key={item.id} style={{ padding: "8px 0", marginBottom: '15px', display: 'flex', alignItems: "center", justifyContent: 'space-between', borderBottom: "1px solid #DB4444" }}>
                            <img src={item.image} alt="" style={{ width: "40px" }} />
                            <strong style={{ width: "70%", textAlign: "center" }}>{item.title}</strong>
                            <span>${item.price}</span>
                            <span>{item.quantity}</span>
                        </div>
                    ))}
                </div>
                <h5 style={{ fontSize: "16px" }} className='d-flex justify-content-between'>Total: <span style={{ color: "#000" }} className=''>${finalTotalPrice}</span></h5>
                <div style={{ marginBottom: '15px', marginTop: '20px' }}>
                    <label className='ms-4 mb-1'>Coupon Code</label>
                    <div className='d-flex align-items-center justify-content-center'>
                        <input
                            type="text"
                            name="coupon"
                            className='form-control py-2'
                            value={formData.coupon}
                            onChange={handleInputChange}
                            placeholder="Enter Coupon"
                            style={{ width: '60%', marginRight: '10px' }}
                        />
                        <MainButton ourStyle={'py-2 w-100'} action={applyCoupon} title={'Apply Coupon'} />
                    </div>
                </div>
                <MainButton ourStyle={'mr-auto'} title={'Place Order'} action={handleCheckout} />
            </div>
        </div>
    );
}

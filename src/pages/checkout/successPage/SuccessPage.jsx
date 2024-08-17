import React from 'react';
import { Link } from 'react-router-dom';
import MainButton from '../../../ReusableComponents/MainButton';

const Success = () => {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center text-center py-5" style={{minHeight:"60vh"}}>
            <h1 className="mb-4">Order Confirmed!</h1>
            <img src="assets/success-tick-dribbble.gif" alt="" style={{width:"250px"}}/>
            <p className="mb-4">Thank you for your purchase. Your order has been placed successfully.</p>
            <p className="mb-4">You will receive a confirmation email shortly with the details of your order.</p>
           
            <div className="mt-4 d-flex gap-3">
                <Link to="/" style={{textDecoration:"none"}}>
                <MainButton title={'Go to Home'} />
                </Link>
                <Link to="/orders" style={{textDecoration:"none"}}>
                    <MainButton title={'View Orders'} />
                </Link>
            </div>
        </div>
    );
};

export default Success;

import React from 'react';
import { Link } from 'react-router-dom';
import MainButton from '../../../ReusableComponents/MainButton';

const Cancel = () => {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center text-center py-5" style={{minHeight:"60vh"}}>
            <h1 className="mb-4">Order Cancelled</h1>
            <p className="mb-4">It looks like there was an issue with your order, and it could not be processed.</p>
            <p className="mb-4">Please try again later or contact support if you need further assistance.</p>
           
            <div className="mt-4 d-flex gap-3">
                <Link to="/" style={{textDecoration:"none"}} >
                    <MainButton title={'Return to Home'} />
                    </Link>
                <Link to="/contact" className="btn btn-info text-white">Contact Support</Link>
            </div>
        </div>
    );
};

export default Cancel;

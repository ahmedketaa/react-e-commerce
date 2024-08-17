import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import MainButton from '../../ReusableComponents/MainButton';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        setAlertMessage('Thank you for contacting us!');
        setShowAlert(true);
    };

    return (
        <div style={{minHeight:"50vh"}} className="container w-100 my-5 d-flex justify-content-between align-items-center">
            <div className="left shadow p-5 rounded" style={{width:"30%"}}>
               <div>
               <div className="call mb-4 d-flex align-items-center gap-3">
                    <img src="assets/icons-phone.svg" alt="" />
                    <h4>Call To Us</h4>
                </div>
                <p>We are available 24/7, 7 days a week.</p>
                <p>201110498656</p>
               </div>
               <div>
                <hr style={{width:"80%", alignSelf:"center"}}/>
               <div className="call mb-4 d-flex align-items-center gap-3">
                    <img src="assets/icons-mail.svg" alt="" />
                    <h4>Write To Us</h4>
                </div>
                <p>Fill out our form and we will contact you within 24 hours.</p>
                <p>Emails: customer@exclusive.com</p>
               </div>
            </div>
            <div className="right shadow p-5 rounded" style={{width:"60%"}}>
                <div className="inputs d-flex justify-content-center gap-3 mb-3">
                    <input placeholder='Your Name *' type="text" className="form-control py-2" />
                    <input placeholder='Your Email *' type="text" className="form-control py-2" />
                    <input placeholder='Your Phone *' type="text" className="form-control py-2" />
                </div>
                <textarea cols={3} rows={8} className='form-control' name="message" id=""></textarea>
                <MainButton ourStyle={'mt-3 ms-auto'} title={'Send Message'} />
            </div>
        </div>
    );
};

export default ContactUs;

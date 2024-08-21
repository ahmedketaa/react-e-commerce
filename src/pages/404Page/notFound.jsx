import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainButton from '../../ReusableComponents/MainButton';

const NotFoundPage = () => {
    return (
        <Container className="my-5 text-center">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="display-1 mt-4">404</h1>
                    <h2 className="mb-4 mt-3">Oops! Page Not Found</h2>
                    <p className="lead mt-4">
                    Your visited page not found. You may go home page.</p>
                    <Link to="/" style={{textDecoration:"none"}} className='mt-5'>
                       <MainButton title={'Go Home'}   ourStyle='mt-4'/>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;

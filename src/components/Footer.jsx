import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>BookMyShow</h5>
            <p>Book your movie tickets easily and quickly.</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white-50">Home</a></li>
              <li><a href="/about" className="text-white-50">About Us</a></li>
              <li><a href="/contact" className="text-white-50">Contact</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <p className="text-white-50">
              Facebook | Twitter | Instagram
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center text-white-50">
            <p>&copy; 2024 BookMyShow. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

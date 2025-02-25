import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row className="w-100">
            <Col md={4} className="text-center">
              <h6>Liên hệ</h6>
              <p>Email: support@shopfruit.com</p>
              <p>SĐT: 123-456-7890</p>
              <p>Địa Chỉ: 123 Xo Viet Nghe Tinh</p>
            </Col>
            <Col md={4} className="text-center">
              <h6>Liên kết nhanh</h6>
              <p><a href="/" className="footer-link">Trang Chủ</a></p>
              <p><a href="/" className="footer-link">About</a></p>
            </Col>
            <Col md={4} className="text-center">
              <h6>Theo dõi chúng tôi</h6>
              <p>
                <a href="http://localhost:3000/" className="footer-link">Twitter</a> | 
                <a href="http://localhost:3000/" className="footer-link"> Facebook</a> | 
                <a href="http://localhost:3000/" className="footer-link"> Instagram</a>
              </p>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-center">
              <div className="footer-text">
                © 2024 ShopFruit. All rights reserved.
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;

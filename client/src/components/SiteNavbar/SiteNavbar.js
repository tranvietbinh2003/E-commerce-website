import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Identicon from 'identicon.js';
import './style.css'; // Import the custom CSS
import logo from '../images/logo.png'
const SiteNavbar = ({ onViewChange, account }) => {
  return (
    <Navbar id="header">
      <Navbar.Brand href="#home" onClick={() => onViewChange("home")}>
        <img src={logo} alt="Logo" style={{ height: "90px" }} />
      </Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-nav">
          <Nav.Link href="#home" onClick={() => onViewChange('home')}>Trang Chủ</Nav.Link>
          <Nav.Link href="#addProduct" onClick={() => onViewChange('addProduct')}>Thêm Sản Phẩm</Nav.Link>
          <Nav.Link href="#productList" onClick={() => onViewChange('productList')}>Mục Sản Phẩm</Nav.Link>
        </Nav>
        <Nav.Item className='account-display'>
          {account && (
            <>
              <img
                width='40'
                height='40'
                src={`data:image/png;base64,${new Identicon(account, 40).toString()}`}
                alt="profile"
              />
              <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
            </>
          )}
        </Nav.Item>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SiteNavbar;

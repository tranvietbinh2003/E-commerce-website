import React from 'react';
import SiteNavbar from '../SiteNavbar/SiteNavbar';
import ProductForm from '../ProductForm/ProductForm';
import ProductList from '../ProductList/ProductList';
import Footer from '../SiteNavbar/Footer';
import Home from '../Home/Home';

const Main = ({ currentView, items, onSubmit, onInputChange, onViewChange, handleBuyItem, handleDeliverItem, handleSubmitRating, account }) => {
  return (
    <div>
      <SiteNavbar onViewChange={onViewChange} account={account} /> 
      {currentView === 'home' && <Home />}
      {currentView === 'addProduct' && (
        <ProductForm onSubmit={onSubmit} onInputChange={onInputChange} />
      )}
      {currentView === 'productList' && (
        <ProductList 
          items={items} 
          handleBuyItem={handleBuyItem} 
          handleDeliverItem={handleDeliverItem} 
          handleSubmitRating={handleSubmitRating} 
          account={account}
        />
      )}
      <Footer />
    </div>
  );
};

export default Main;

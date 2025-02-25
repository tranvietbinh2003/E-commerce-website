import React, { useState } from 'react';
import './style.css'; 

const ProductForm = ({ onSubmit, onInputChange }) => {
  const [formValues, setFormValues] = useState({ cost: '', itemName: '' });
  const [errors, setErrors] = useState({ cost: '', itemName: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
    onInputChange(e);
  };

  const handleSubmit = () => {
    let valid = true;
    let newErrors = { cost: '', itemName: '' };

    if (!formValues.cost) {
      newErrors.cost = 'Số lượng Wei là bắt buộc';
      valid = false;
    }

    if (!formValues.itemName) {
      newErrors.itemName = 'Tên sản phẩm là bắt buộc';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      onSubmit();
    }
  };

  return (
    <div className="product-form-container">
      <div className="product-form">
        <h2>Thêm sản phẩm</h2>
        <p>
          <input
            type="text"
            name="cost"
            value={formValues.cost}
            onChange={handleChange}
            placeholder="Nhập số lượng Wei"
          />
          {errors.cost && <span className="error-message">{errors.cost}</span>}
        </p>
        <p>
          <input
            type="text"
            name="itemName"
            value={formValues.itemName}
            onChange={handleChange}
            placeholder="Nhập tên sản phẩm"
          />
          {errors.itemName && <span className="error-message">{errors.itemName}</span>}
        </p>
        <button type="button" onClick={handleSubmit}>
          Tạo sản phẩm
        </button>
      </div>
    </div>
  );
};

export default ProductForm;

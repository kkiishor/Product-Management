import React, { useState } from 'react';

const ProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    description: '',
    category: '',
    availability: false,
    price: 0,
    quantity: 0,
    attributes: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setFormData({ ...formData, availability: !formData.availability });
  };

  const handleAddAttribute = () => {
    setFormData({ ...formData, attributes: [...formData.attributes, { key: '', value: '' }] });
  };

  const handleRemoveAttribute = (index) => {
    const newAttributes = formData.attributes.filter((_, i) => i !== index);
    setFormData({ ...formData, attributes: newAttributes });
  };

  const handleAttributeChange = (index, key, value) => {
    const newAttributes = formData.attributes.map((attr, i) => (
      i === index ? { ...attr, [key]: value } : attr
    ));
    setFormData({ ...formData, attributes: newAttributes });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="modal border-2 mt-5">
      <div className="modal-content border-2">
        <h2 className='text-lg text-black font-semibold	'>{product ? 'Edit Product' : 'Create Product'}</h2>
        <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className='block'>
          Product Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label className='block'>
          Product Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Health & Personal Care">Health & Personal Care</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Automotive">Automotive</option>
            <option value="Beauty & Grooming">Beauty & Grooming</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>
        </label>
        <label  className='block'>
          Availability:
          <button className='px-5 py-2' type="button" onClick={handleToggle}>
            {formData.availability ? 'In Stock' : 'Out Stock'}
          </button>
        </label>
        <label  className='block'>
          Price:
          <input
            className='pl-2'
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label  className='block'>
          Quantity:
          <input
            className='pl-2'
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>
        <label>
          Attributes:
          {formData.attributes.map((attr, index) => (
            <div key={index} className="attribute-pair">
              <input
                className='mr-2'
                type="text"
                placeholder="Key"
                value={attr.key}
                onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
              />
              <input
                className='mr-2'
                type="text"
                placeholder="Value"
                value={attr.value}
                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveAttribute(index)}>Remove</button>
            </div>
          ))}
          <button className='bg-gray-200 p-2 mr-2 block mb-5' type="button" onClick={handleAddAttribute}>Add Attribute</button>
        </label>
        <div className='flex justify-center mb-2'>
        <button className='bg-gray-200 px-2 mr-2' type="button" onClick={handleSubmit}>Save</button>
        <button className='bg-gray-200 p-2 mr-2' type="button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

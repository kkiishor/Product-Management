import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTable = ({ onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios.get(`https://ops.cloud.leadtorev.com/product-catalog/get/all?page=${page}`)
      .then(response => {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [page]);

  const handleDelete = (productId) => {
    onDelete(productId);
  };

  const handleEdit = (product) => {
    onEdit(product);
  };

  return (
    <div>
      <table>
        <thead>
          <tr className='border-2 bg-yellow-200'>
            <th className='inline-block mr-5'>Product ID</th>
            <th className='inline-block mr-5'>Product Name</th>
            <th className='inline-block mr-5'>Category</th>
            <th className='inline-block mr-5'>Price</th>
            <th className='inline-block mr-5'>Availability</th>
            <th className='inline-block mr-5'>Quantity</th>
            <th className='inline-block mr-5'>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.availability ? 'In Stock' : 'Out Stock'}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;

import React, { useState } from 'react';
import ProductModal from './ProductModal';
import ProductTable from './ProductTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import axios from 'axios';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleSaveProduct = (product) => {
    const apiCall = selectedProduct
      ? axios.put('https://ops.cloud.leadtorev.com/product-catalog/update', product)
      : axios.post('https://ops.cloud.leadtorev.com/product-catalog/create', product);

    apiCall.then(() => {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }).catch(error => console.error('Error saving product:', error));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProductIdToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (productId) => {
    axios.delete(`https://ops.cloud.leadtorev.com/product-catalog/delete/${productId}`)
      .then(() => {
        setIsDeleteModalOpen(false);
        setProductIdToDelete(null);
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="App flex flex-col bg-gray-100">
      <button onClick={() => setIsModalOpen(true)} className='bg-gray-200 mb-5 self-center '>Add Product</button>
      <ProductTable onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          productId={productIdToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;

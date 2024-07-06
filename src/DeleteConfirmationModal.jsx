import React from 'react';

const DeleteConfirmationModal = ({ productId, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this product?</h2>
        <button onClick={() => onConfirm(productId)}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

import React, { useState } from 'react';
import './AddVisionItemModal.css';

const AddVisionItemModal = ({ onClose, onAddItem }) => {
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting new item:', newItem);
    onAddItem(newItem);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Vision Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={newItem.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={newItem.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="imageUrl"
            value={newItem.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
          <div className="modal-actions">
            <button type="submit">Add Item</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisionItemModal;
import React, { useState, useEffect } from 'react';
import './VisionItem.css';

const VisionItem = ({ item, onUpdate, onDelete, onDrop }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);
  const [position, setPosition] = useState(item.position || { x: 0, y: 0 });

  useEffect(() => {
    setPosition(item.position || { x: 0, y: 0 });
  }, [item.position]);

  useEffect(() => {
    const element = document.getElementById(`vision-item-${item.id}`);
    if (element) {
      element.style.setProperty('--x', `${position.x}px`);
      element.style.setProperty('--y', `${position.y}px`);
    }
  }, [position, item.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(item.id, { ...editedItem, position });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleDragStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setData('text/plain', JSON.stringify({ id: item.id, offsetX, offsetY }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(e, item.id);
  };

  return (
    <div
      id={`vision-item-${item.id}`}
      className="vision-item"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isEditing ? (
        <div className="vision-item-edit">
          <input
            type="text"
            name="title"
            value={editedItem.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            name="description"
            value={editedItem.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="imageUrl"
            value={editedItem.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <div className="vision-item-content">
            <img src={item.imageUrl} alt={item.title} className="vision-item-image" />
            <h3 className="vision-item-title">{item.title}</h3>
            <p className="vision-item-description">{item.description}</p>
          </div>
          <div className="vision-item-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default VisionItem;
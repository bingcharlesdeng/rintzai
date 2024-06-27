import React from 'react';
import VisionItem from './VisionItem';
import './VisionBoard.css';

const VisionBoard = ({ items, onUpdateItem, onDeleteItem, onUpdatePosition }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const { id, offsetX, offsetY } = JSON.parse(e.dataTransfer.getData('text/plain'));
    const boardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boardRect.left - offsetX;
    const y = e.clientY - boardRect.top - offsetY;
    onUpdatePosition(id, { x, y });
  };

  return (
    <div className="vision-board" onDragOver={handleDragOver} onDrop={handleDrop}>
      {items.map((item) => (
        <VisionItem
          key={item.id}
          item={item}
          onUpdate={onUpdateItem}
          onDelete={onDeleteItem}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default VisionBoard;
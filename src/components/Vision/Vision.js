import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import { db, collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from '../../firebase/firebase';
import VisionBoard from './VisionBoard';
import AddVisionItemModal from './AddVisionItemModal';
import Navbar from '../Routes/Navbar';
import { toast } from 'react-toastify';
import './Vision.css';

const Vision = () => {
  const { user } = useUserContext();
  const [visionItems, setVisionItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchVisionItems();
    }
  }, [user]);

  const fetchVisionItems = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'visions'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVisionItems(items);
    } catch (error) {
      console.error('Error fetching vision items:', error);
      toast.error('Failed to load vision items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addVisionItem = async (newItem) => {
    try {
      const docRef = await addDoc(collection(db, 'visions'), {
        ...newItem,
        userId: user.uid,
        createdAt: new Date(),
        position: { x: 0, y: 0 }
      });
      const addedItem = { id: docRef.id, ...newItem, position: { x: 0, y: 0 } };
      setVisionItems(prev => [...prev, addedItem]);
      setIsModalOpen(false);
      toast.success('Vision item added successfully!');
    } catch (error) {
      console.error('Error adding vision item:', error);
      toast.error('Failed to add vision item. Please try again.');
    }
  };

  const updateVisionItem = async (id, updatedItem) => {
    try {
      await updateDoc(doc(db, 'visions', id), updatedItem);
      setVisionItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
      toast.success('Vision item updated successfully!');
    } catch (error) {
      console.error('Error updating vision item:', error);
      toast.error('Failed to update vision item. Please try again.');
    }
  };

  const deleteVisionItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'visions', id));
      setVisionItems(prev => prev.filter(item => item.id !== id));
      toast.success('Vision item deleted successfully!');
    } catch (error) {
      console.error('Error deleting vision item:', error);
      toast.error('Failed to delete vision item. Please try again.');
    }
  };

  const updateItemPosition = async (id, position) => {
    try {
      await updateDoc(doc(db, 'visions', id), { position });
      setVisionItems(prev => prev.map(item => item.id === id ? { ...item, position } : item));
    } catch (error) {
      console.error('Error updating item position:', error);
      toast.error('Failed to save new position. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="vision-container">
        <h1 className="vision-title">My Vision Board</h1>
        <p className="vision-description">Visualize and organize your goals and dreams.</p>
        <button className="add-vision-item-button" onClick={() => setIsModalOpen(true)}>
          Add New Vision
        </button>
        {isLoading ? (
          <div className="loading-spinner">Loading your visions...</div>
        ) : (
          <VisionBoard
            items={visionItems}
            onUpdateItem={updateVisionItem}
            onDeleteItem={deleteVisionItem}
            onUpdatePosition={updateItemPosition}
          />
        )}
        {isModalOpen && (
          <AddVisionItemModal
            onClose={() => setIsModalOpen(false)}
            onAddItem={addVisionItem}
          />
        )}
      </div>
    </>
  );
};

export default Vision;
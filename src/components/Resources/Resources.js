import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import ResourceList from './ResourceList';
import ResourceSearch from './ResourceSearch';
import ResourceCategories from './ResourceCategories';
import ResourceDetails from './ResourceDetails';
import ResourceBookmarks from './ResourceBookmarks';
import ResourceSuggestions from './ResourceSuggestions';
import { fetchResources, fetchUserBookmarks } from './resourceService';
import './Resources.css';
import Navbar from '../Routes/Navbar';

const Resources = () => {
  const { user } = useUserContext();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResourceData = async () => {
      setIsLoading(true);
      try {
        const fetchedResources = await fetchResources();
        setResources(fetchedResources);
        setFilteredResources(fetchedResources);

        if (user) {
          const userBookmarks = await fetchUserBookmarks(user.uid);
          setBookmarks(userBookmarks);
        }
      } catch (error) {
        console.error('Error loading resource data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResourceData();
  }, [user]);

  const handleSearch = (searchTerm) => {
    const filtered = resources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResources(filtered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredResources(resources);
    } else {
      const filtered = resources.filter(resource => resource.category === category);
      setFilteredResources(filtered);
    }
  };

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
  };

  const handleBookmarkToggle = async (resourceId) => {
    // This would typically involve a call to your backend service
    console.log(`Toggling bookmark for resource ${resourceId}`);
  };

  if (isLoading) {
    return <div className="loading">Loading resources...</div>;
  }

  return (
    
      
      <div className="resources-container">
        <h1>Mental Health Resources</h1>
        <div className="resources-content">
          <div className="resources-sidebar">
            <ResourceSearch onSearch={handleSearch} />
            <ResourceCategories 
              categories={['All', ...new Set(resources.map(r => r.category))]}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
            <ResourceBookmarks 
              bookmarks={bookmarks}
              onResourceSelect={handleResourceSelect}
            />
          </div>
          <div className="resources-main">
            <ResourceList 
              resources={filteredResources}
              onResourceSelect={handleResourceSelect}
              bookmarks={bookmarks}
              onBookmarkToggle={handleBookmarkToggle}
            />
          </div>
          <div className="resources-sidebar">
            {selectedResource ? (
              <ResourceDetails 
                resource={selectedResource}
                isBookmarked={bookmarks.includes(selectedResource.id)}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ) : (
              <ResourceSuggestions 
                resources={resources}
                onResourceSelect={handleResourceSelect}
              />
            )}
          </div>
        </div>
      </div>
    
  );
};

export default Resources;
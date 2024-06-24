import React from 'react';
import './detailsPage.css';

const DetailsPage = ({ caption, setCaption, location, setLocation, altText, setAltText, tags, setTags }) => {
  const handleTagChange = (e) => {
    setTags(e.target.value.split(',').map(tag => tag.trim()));
  };

  return (
    <div className="details-page">
      <div className="form-group">
        <label htmlFor="caption-input">Caption</label>
        <textarea
          id="caption-input"
          className="caption-input"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location-input">Location</label>
        <input
          id="location-input"
          className="location-input"
          type="text"
          placeholder="Add location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="alt-text-input">Alt Text</label>
        <input
          id="alt-text-input"
          className="alt-text-input"
          type="text"
          placeholder="Add alternative text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags-input">Tags</label>
        <input
          id="tags-input"
          className="tags-input"
          type="text"
          placeholder="Add tags (comma-separated)"
          value={tags.join(', ')}
          onChange={handleTagChange}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
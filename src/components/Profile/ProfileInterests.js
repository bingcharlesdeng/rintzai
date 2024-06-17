import React from 'react';
import './profileInterests.css';

const ProfileInterests = ({ profile, editMode, onFieldChange }) => {
  return (
    <div className="profile-interests">
      <h3 className="section-title">Interests</h3>
      <div className="profile-section">
        <h4 className="subsection-title">Favorite Quotes</h4>
        {editMode ? (
          <textarea
            value={profile.favoriteQuotes.join('\n')}
            onChange={(e) => onFieldChange('favoriteQuotes', e.target.value.split('\n'))}
            className="favorite-quotes-input"
            placeholder="Enter your favorite quotes, one per line"
          />
        ) : (
          <ul className="favorite-quotes-list">
            {profile.favoriteQuotes.map((quote, index) => (
<li key={index} className="favorite-quote">
{quote}
</li>
))}
</ul>
)}
</div>
<div className="profile-section">
<h4 className="subsection-title">Hobbies</h4>
{editMode ? (
<input
type="text"
value={profile.hobbies.join(', ')}
onChange={(e) => onFieldChange('hobbies', e.target.value.split(',').map((hobby) => hobby.trim()))}
className="hobbies-input"
placeholder="Enter your hobbies, separated by commas"
/>
) : (
<p className="hobbies-text">{profile.hobbies.join(', ') || 'N/A'}</p>
)}
</div>
</div>
);
};
export default ProfileInterests;
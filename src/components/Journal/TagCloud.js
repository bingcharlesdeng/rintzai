import React from 'react';
import './tagCloud.css';

const TagCloud = ({ entries, onTagSelect }) => {
  console.log('Rendering TagCloud with entries:', entries);

  const tagCounts = entries.reduce((acc, entry) => {
    entry.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const tagData = Object.keys(tagCounts).map(tag => ({
    value: tag,
    count: tagCounts[tag]
  }));

  // Sort tags by count (descending) and limit to top 30
  const sortedTags = tagData
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);

  return (
    <div className="tag-cloud">
      <h3>Tag Cloud</h3>
      <div className="tag-cloud-content">
        {sortedTags.map(tag => (
            <span
                key={tag.value}
                className="tag-item"
                style={{
                fontSize: `${Math.max(12, Math.min(30, 12 + tag.count * 2))}px`
                }}
                onClick={() => onTagSelect(tag.value)}
            >
                {tag.value}
            </span>
            ))}
        </div>
        </div>
    );
    };

export default TagCloud;
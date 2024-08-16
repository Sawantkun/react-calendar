// components/TagInput.js
import React from 'react';
import styled from 'styled-components';

const TagInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background-color: ${(props) => (props.selected ? '#007bff' : '#e0e0e0')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => (props.selected ? '#007bff' : '#ddd')};
`;

const TagInput = ({ presetTags, selectedTags, setSelectedTags }) => {
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      // Remove tag if already selected
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // Add tag if not selected
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <TagInputContainer>
      {presetTags.map((tag) => (
        <Tag
          key={tag}
          selected={selectedTags.includes(tag)}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </Tag>
      ))}
    </TagInputContainer>
  );
};

export default TagInput;

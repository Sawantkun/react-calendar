// components/EditEventForm.js
import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TagInput from './tagInput';

const FormContainer = styled.div`
  margin: 20px;
`;

const Input = styled.input`
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
`;

const TextArea = styled.textarea`
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  height: 100px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function EditEventForm({ event, onClose }) {
  const { editEvent } = useContext(EventContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [selectedTags, setSelectedTags] = useState(event.category.split(', '));
  const [description, setDescription] = useState(event.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      id: event.id,
      title,
      date,
      category: selectedTags.join(', '),
      description,
    };

    editEvent(updatedEvent);
    onClose(); // Close the modal after updating the event
    navigate('/'); // Redirect to home or another page
  };

  const presetTags = ['Work', 'Personal',  'Other']; // Example preset tags

  return (
    <FormContainer>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TagInput
          presetTags={presetTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <TextArea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Update Event</Button>
      </form>
    </FormContainer>
  );
}

export default EditEventForm;

// components/AddEventForm.js
import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';
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

function AddEventForm({ defaultDate, onClose }) {
  const { addEvent } = useContext(EventContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(defaultDate || '');
  const [selectedTags, setSelectedTags] = useState([]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date) {
      alert('Please fill in all fields');
      return;
    }

    const newEvent = {
      id: Date.now(), // Using timestamp as a simple ID
      title,
      date,
      category: selectedTags.join(', '),
      description,
    };

    addEvent(newEvent);
    onClose(); // Close the modal after adding the event

    // Clear the form
    setTitle('');
    setDate('');
    setSelectedTags([]);
    setDescription('');
  };

  const presetTags = ['Work', 'Personal',  'Other']; // Example preset tags

  return (
    <FormContainer>
      <h2>Add Event</h2>
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
        <Button type="submit">Add Event</Button>
      </form>
    </FormContainer>
  );
}

export default AddEventForm;

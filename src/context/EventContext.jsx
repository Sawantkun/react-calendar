// context/EventContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EventContext = createContext();

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events`);
        if (response.data && Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
          setError('Unexpected response data. Please check the API configuration.');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      await axios.post(`${BASE_URL}/events`, newEvent);
      setEvents(prevEvents => [...prevEvents, newEvent]);
    } catch (error) {
      console.error('Error adding event:', error);
      setError('Failed to add event.');
    }
  };

  const editEvent = async (updatedEvent) => {
    try {
      await axios.put(`${BASE_URL}/events/${updatedEvent.id}`, updatedEvent);
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    } catch (error) {
      console.error('Error editing event:', error);
      setError('Failed to edit event.');
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/events/${id}`);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event.');
    }
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent, loading, error }}>
      {children}
    </EventContext.Provider>
  );
};

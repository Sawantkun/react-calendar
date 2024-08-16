// EventDetailsPage.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 10px;
  color: #333;
`;

const Detail = styled.p`
  font-size: 1.1em;
  margin: 10px 0;
  color: #555;
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const { events, loading, error } = useContext(EventContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!loading && !error) {
      // Convert eventId to integer
      const id = parseInt(eventId, 10);
      const foundEvent = events.find(e => e.id === id);
      setEvent(foundEvent);
    }
  }, [eventId, events, loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <Container>
      <Card>
        <Title>{event.title}</Title>
        <Detail><Strong>Date:</Strong> {new Date(event.date).toDateString()}</Detail>
        <Detail><Strong>Category:</Strong> {event.category}</Detail>
        <Detail><Strong>Description:</Strong> {event.description}</Detail>
      </Card>
    </Container>
  );
};

export default EventDetailsPage;

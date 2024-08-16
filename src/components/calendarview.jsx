import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';
import Modal from './modal';
import AddEventForm from './addEvent';
import EditEventForm from './editEvent';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CalendarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
  background-color: #f4f4f9;
  scale: 0.9;
  border-radius:10px;
    border:1px solid #eee;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    flex-direction: column; // Change to column layout for small screens
    scale: 1; // Reset scale for smaller screens
    padding: 5px;
  }
`;

const Day = styled.div`
  width: 13.25%;
  height: 150px;
  border: 1px solid #ddd;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  margin: 0 0.5% 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  & > .day-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 0.9em;
    font-weight: bold;
    margin-bottom: 5px;
  }

  & > .events-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    overflow: scroll;
  }
  
  & > .events-container::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 600px) {
    width: 95%; // Full width for small screens
    height: auto; // Auto height for small screens
    margin: 5px; // Adjust margin for small screens
  }
`;



const EventBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  background: #e9ecef;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
  font-size: 1em;
`;

const EventLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 0.9em;
`;

const EventActions = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 0.9em;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

const IconButton = styled(Button)`
  margin-left: 5px;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  max-width: 500px;
  padding: 10px;
  background: #ffffff;
  border-radius: 8px;
  border:1px solid #eee;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    max-width:300px;
  }
`;

const MonthControls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  @media (max-width: 600px) {
    font-size: 1em;
  }
`;

const MonthButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 1.5em;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #0056b3;
    transform: scale(1.1);
  }
`;

const MonthLabel = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #333;

  @media (max-width: 600px) {
    font-size: 1em;
  }
`;

const AddEventButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 0.8em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const CategorySelect = styled.select`
  margin-right: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`;
const Heading = styled.h1`
  text-align: center;

  @media (max-width: 600px) {
    font-size:1em;
  }
`;
const Features = styled.div`
  @media (max-width: 600px) {
    font-size:1em;
  }
`;

function CalendarView() {
  const { events, deleteEvent } = useContext(EventContext);
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('All');

  const openEditModal = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsEditModalOpen(true);
    setIsAddModalOpen(false);
  };

  const openAddModal = (date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setSelectedDate(formattedDate);
    setIsAddModalOpen(true);
    setIsEditModalOpen(false);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate('');
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory);

  return (
    <>
    <Heading>React Event Calendar</Heading>
      <ControlPanel>
        <MonthControls>
          <MonthButton onClick={() => handleMonthChange(-1)}>
            <FaChevronLeft />
          </MonthButton>
          <MonthLabel>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</MonthLabel>
          <MonthButton onClick={() => handleMonthChange(1)}>
            <FaChevronRight />
          </MonthButton>
        </MonthControls>
        <Features>
          <CategorySelect value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </CategorySelect>
          <AddEventButton onClick={() => openAddModal(new Date())}>
            Add Event
          </AddEventButton>
        </Features>
      </ControlPanel>
      
      <CalendarContainer>
  {[...Array(firstDayOfMonth).fill(null), ...Array(daysInMonth).keys()].map((_, i) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - firstDayOfMonth + 1);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }); // Shortened day of the week
    const dateNumber = date.getDate();

    // Check if the date is within the current month
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

    return (
      isCurrentMonth && (
        <Day key={i} onClick={() => openAddModal(date)}>
          <div className="day-info">
            <div>{dayOfWeek}</div>
            <div className="date-number">{dateNumber}</div>
          </div>
          <div className="events-container">
            {filteredEvents
              .filter(event => new Date(event.date).toDateString() === date.toDateString())
              .map(event => (
                <EventBox key={event.id} onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/event/${event.id}`);
                }}>
                  <EventLink>
                    {event.title}
                  </EventLink>
                  <EventActions>
                    <IconButton onClick={(e) => openEditModal(event, e)}>
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEvent(event.id);
                      }}
                    >
                      <FaTrash />
                    </IconButton>
                  </EventActions>
                </EventBox>
              ))}
          </div>
        </Day>
      )
    );
  })}
</CalendarContainer>


      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={closeModal}>
          <AddEventForm onClose={closeModal} defaultDate={selectedDate} />
        </Modal>
      )}

      {isEditModalOpen && selectedEvent && (
        <Modal isOpen={isEditModalOpen} onClose={closeModal}>
          <EditEventForm event={selectedEvent} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default CalendarView;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './components/calendarview';
import EventDetailsPage from './components/eventdetails';
import { EventProvider } from './context/EventContext';
import "./App.css"

function App() {
  return (
    <Router>
        <EventProvider>
        <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/event/:eventId" element={<EventDetailsPage />} />
      </Routes>
        </EventProvider>
      </Router>
  );
}

export default App;

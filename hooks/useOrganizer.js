import { useState, useEffect } from 'react';
import { organizerAPI } from '../services/api.js';

export const useOrganizer = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [dashboard, eventsData, bookingsData] = await Promise.all([
        organizerAPI.getDashboard(),
        organizerAPI.getEvents(),
        organizerAPI.getBookings()
      ]);
      
      setDashboardData(dashboard.data);
      setEvents(eventsData.data);
      setBookings(bookingsData.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    await organizerAPI.createEvent(eventData);
    loadDashboardData();
  };

  const updateBookingStatus = async (bookingId, status, message = '') => {
    await organizerAPI.updateBookingStatus(bookingId, status, message);
    loadDashboardData();
  };

  return {
    dashboardData,
    events,
    bookings,
    loading,
    loadDashboardData,
    createEvent,
    updateBookingStatus
  };
};
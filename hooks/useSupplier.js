import { useState } from 'react';
import { supplierAPI } from '../services/api.js';

export const useSupplier = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [dashboard, events, bookings] = await Promise.all([
        supplierAPI.getDashboard(),
        supplierAPI.getAvailableEvents(),
        supplierAPI.getBookings()
      ]);
      
      setDashboardData(dashboard.data);
      setAvailableEvents(events.data);
      setMyBookings(bookings.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const bookEvent = async (eventId, bookingData) => {
    await supplierAPI.bookEvent(eventId, bookingData);
    loadDashboardData();
  };

  return {
    dashboardData,
    availableEvents,
    myBookings,
    loading,
    loadDashboardData,
    bookEvent
  };
};
import { useCallback } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoomDetailPage from './pages/RoomDetailPage';
import BookingsPage from './pages/BookingsPage';

function AppContent() {
  const { state, clearNotification } = useApp();
  const { user, page, notification } = state;

  const handleClear = useCallback(
    () => clearNotification(),
    [clearNotification]
  );

  return (
    <div>
      <Notification notif={notification} onClose={handleClear} />

      {!user ? (
        <LoginPage />
      ) : (
        <>
          <Navbar />
          {page === 'dashboard' && <DashboardPage />}
          {page === 'room' && state.selectedRoom && <RoomDetailPage />}
          {page === 'bookings' && <BookingsPage />}
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

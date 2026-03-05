import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import '../css/BookingsPage.css';

export default function BookingsPage() {
  const { state, dispatch } = useApp();
  const { bookings } = state;

  if (bookings.length === 0) {
    return (
      <div className="page-wrap">
        <div className="page-header">
          <h1>My Bookings</h1>
        </div>
        <div className="empty-state">
          <div className="icon">🛎️</div>
          <h3>No bookings yet</h3>
          <p>Explore our rooms and make your first reservation</p>
          <Button
            variant="primary"
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
          >
            Browse Rooms
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>
          {bookings.length} reservation{bookings.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="bookings-list">
        {bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <div className="booking-icon-container">
              {b.roomImage ? (
                <img
                  src={b.roomImage}
                  alt={b.roomName}
                  className="booking-room-img"
                />
              ) : (
                <span style={{ fontSize: 32 }}>🏨</span>
              )}
            </div>

            <div className="booking-info">
              <h4 className="booking-room-name">{b.roomName}</h4>
              <p className="booking-meta">{b.roomType}</p>
              <p className="booking-dates">
                📅 {b.checkIn} → {b.checkOut}
              </p>
              <p className="booking-at">Booked on {b.bookedAt}</p>
              <span className="status-badge status-confirmed">Confirmed</span>
            </div>

            <div className="booking-price-col">
              <div className="booking-price">₹{b.total.toLocaleString()}</div>
              <div className="booking-nights">
                {b.nights} night{b.nights > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

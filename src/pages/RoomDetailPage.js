import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { checkAvailabilityAPI, confirmBookingAPI } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import '../css/RoomDetailPage.css';

export default function RoomDetailPage() {
  const { state, dispatch } = useApp();
  const room = state.selectedRoom;
  const today = new Date().toISOString().split('T')[0];

  const [dates, setDates] = useState({ checkIn: today, checkOut: '' });
  const [errors, setErrors] = useState({});
  const [checking, setChecking] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const nights = useMemo(() => {
    if (!dates.checkIn || !dates.checkOut) return 0;
    const diff =
      (new Date(dates.checkOut) - new Date(dates.checkIn)) / 86400000;
    return diff > 0 ? diff : 0;
  }, [dates]);

  const total = nights * room.price;

  const validate = () => {
    const e = {};
    if (!dates.checkIn) e.checkIn = 'Select check-in date';
    if (!dates.checkOut) e.checkOut = 'Select check-out date';
    if (dates.checkIn && dates.checkOut && dates.checkOut <= dates.checkIn)
      e.checkOut = 'Check-out must be after check-in';
    if (dates.checkIn < today) e.checkIn = 'Cannot select a past date';
    return e;
  };

  const handleDateChange = (e) => {
    setDates((d) => ({ ...d, [e.target.name]: e.target.value }));
    setAvailability(null);
    setErrors((err) => ({ ...err, [e.target.name]: '' }));
  };

  const handleCheckAvailability = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setChecking(true);
    setAvailability(null);
    try {
      const result = await checkAvailabilityAPI(
        room.id,
        dates.checkIn,
        dates.checkOut,
        state.bookings
      );
      setAvailability(result.available ? 'available' : 'unavailable');
    } catch {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: 'error', msg: 'Failed to check availability.' },
      });
    } finally {
      setChecking(false);
    }
  };

  const handleConfirmBooking = async () => {
    setConfirming(true);
    try {
      await confirmBookingAPI({ roomId: room.id, ...dates });
      dispatch({
        type: 'ADD_BOOKING',
        payload: {
          id: Date.now(),
          roomId: room.id,
          roomName: room.name,
          roomImage: room.image,
          roomType: room.type,
          checkIn: dates.checkIn,
          checkOut: dates.checkOut,
          nights,
          total,
          bookedAt: new Date().toLocaleDateString('en-IN'),
        },
      });
      dispatch({ type: 'SET_PAGE', payload: 'bookings' });
    } catch {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: 'error', msg: 'Booking failed.' },
      });
      setConfirming(false);
    }
  };

  return (
    <div className="page-wrap">
      <button
        className="btn btn-ghost"
        style={{ marginBottom: 24 }}
        onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
      >
        ← Back to Rooms
      </button>

      <div className="layout">
        {/* Left: Room Info */}
        <div className="room-info-section">
          <div className="hero">
            {room.image ? (
              <img src={room.image} alt={room.name} className="hero-img" />
            ) : (
              '🏨'
            )}
          </div>

          <div className="room-type">{room.type}</div>
          <h1 className="room-name">{room.name}</h1>

          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Price per night</div>
              <div className="info-value">₹{room.price.toLocaleString()}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Capacity</div>
              <div className="info-value">
                {room.capacity} {room.capacity > 1 ? 'guests' : 'guest'}
              </div>
            </div>
          </div>

          <div className="amen-label">Amenities</div>
          <div className="amenities-list">
            {room.amenities.map((a) => (
              <span key={a} className="amen-tag">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="booking-panel">
          <h3 className="panel-title">Reserve This Room</h3>

          <div className="price-box">
            <div className="big-price">₹{room.price.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>per night</div>
          </div>

          <Input
            label="Check-in Date"
            type="date"
            name="checkIn"
            value={dates.checkIn}
            min={today}
            onChange={handleDateChange}
            error={errors.checkIn}
          />
          <Input
            label="Check-out Date"
            type="date"
            name="checkOut"
            value={dates.checkOut}
            min={dates.checkIn || today}
            onChange={handleDateChange}
            error={errors.checkOut}
          />

          {nights > 0 && (
            <div className="total-row">
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                {nights} night{nights > 1 ? 's' : ''} × ₹
                {room.price.toLocaleString()}
              </span>
              <span className="total-price">₹{total.toLocaleString()}</span>
            </div>
          )}

          {availability && (
            <div
              className={`avail-badge ${availability === 'available' ? 'avail-yes' : 'avail-no'}`}
            >
              {availability === 'available'
                ? '✓ Room is available!'
                : '✗ Not available for selected dates'}
            </div>
          )}

          {availability !== 'available' && (
            <Button
              variant="outline"
              fullWidth
              loading={checking}
              onClick={handleCheckAvailability}
            >
              Check Availability
            </Button>
          )}

          {availability === 'available' && (
            <Button
              variant="gold"
              fullWidth
              loading={confirming}
              onClick={handleConfirmBooking}
              style={{ marginTop: 8 }}
            >
              Confirm Booking →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

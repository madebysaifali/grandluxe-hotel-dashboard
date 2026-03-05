import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ROOMS } from '../services/api';
import RoomCard from '../components/RoomCard';
import '../css/DashboardPage.css'; // CSS Import kiya

export default function DashboardPage() {
  const { state, dispatch } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const types = useMemo(
    () => ['All', ...new Set(ROOMS.map((r) => r.type))],
    []
  );

  const filtered = useMemo(
    () =>
      ROOMS.filter(
        (r) =>
          (filter === 'All' || r.type === filter) &&
          r.name.toLowerCase().includes(search.toLowerCase())
      ),
    [filter, search]
  );

  const bookedRoomIds = useMemo(
    () => new Set(state.bookings.map((b) => b.roomId)),
    [state.bookings]
  );

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1>Our Rooms & Suites</h1>
        <p>Select a room to check availability and make a reservation</p>
      </div>

      {/* Search + Filter bar */}
      <div className="dashboard-toolbar">
        <input
          placeholder="🔍   Search rooms..."
          className="dashboard-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="dashboard-filters">
          {types.map((t) => (
            <button
              key={t}
              className={`btn filter-btn ${filter === t ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Rooms grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🔍</div>
          <h3>No rooms found</h3>
          <p>Try a different search term or filter</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {filtered.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isBooked={bookedRoomIds.has(room.id)}
              onSelect={(r) => dispatch({ type: 'SELECT_ROOM', payload: r })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

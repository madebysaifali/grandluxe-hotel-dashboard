import React from 'react';
import '../css/RoomCard.css'; 

const RoomCard = React.memo(function RoomCard({ room, onSelect, isBooked }) {
  const isImageFile = typeof room.image === 'string' && room.image.length > 4;

  return (
    <div className="card" onClick={() => onSelect(room)}>
      {isBooked && <div className="bookedBadge">BOOKED</div>}

      <div className="img-container">
        {isImageFile ? (
          <img src={room.image} alt={room.name} className="img-file" />
        ) : (
          room.image
        )}
      </div>

      <div className="body">
        <div className="type">{room.type}</div>
        <div className="name">{room.name}</div>
        <div className="amenities">
          {room.amenities.map((a) => (
            <span key={a} className="tag">
              {a}
            </span>
          ))}
        </div>
        <div className="footer">
          <div>
            <span className="price">₹{room.price.toLocaleString()}</span>
            <span className="per"> /night</span>
          </div>
          <span className="capacity">
            👤 {room.capacity} {room.capacity > 1 ? 'guests' : 'guest'}
          </span>
        </div>
      </div>
    </div>
  );
});

export default RoomCard;

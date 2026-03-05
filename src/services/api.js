// Mock rooms data
import thehorizon from '../images/The-Horizon-Suite.jpg';
import ExecutiveChamber from '../images/Executive-Chamber.jpg';
import GardenRetreat from '../images/Garden-Retreat.jpg';
import PentHouse from '../images/Penthouse-Loft.jpg';
import CozyStandrad from '../images/Cozy-Standard.jpg';
import FamilyVilla from '../images/Family-Villa.jpg';
export const ROOMS = [
  {
    id: 1,
    name: 'The Horizon Suite',
    type: 'Suite',
    price: 4200,
    capacity: 2,
    amenities: ['King Bed', 'Sea View', 'Jacuzzi', 'Mini Bar'],
    image: thehorizon,
  },
  {
    id: 2,
    name: 'Executive Chamber',
    type: 'Executive',
    price: 2800,
    capacity: 1,
    amenities: ['Work Desk', 'City View', 'Fast WiFi', 'Coffee Machine'],
    image: ExecutiveChamber,
  },
  {
    id: 3,
    name: 'Garden Retreat',
    type: 'Deluxe',
    price: 1900,
    capacity: 2,
    amenities: ['Garden View', 'Balcony', 'Twin Beds', 'Bathtub'],
    image: GardenRetreat,
  },
  {
    id: 4,
    name: 'Penthouse Loft',
    type: 'Penthouse',
    price: 8500,
    capacity: 4,
    amenities: ['Rooftop Access', 'Private Pool', 'Butler', '360° View'],
    image: PentHouse,
  },
  {
    id: 5,
    name: 'Cozy Standard',
    type: 'Standard',
    price: 950,
    capacity: 1,
    amenities: ['Queen Bed', 'TV', 'AC', 'WiFi'],
    image: CozyStandrad,
  },
  {
    id: 6,
    name: 'Family Villa',
    type: 'Villa',
    price: 6100,
    capacity: 6,
    amenities: ['3 Bedrooms', 'Private Garden', 'Kitchen', 'Pool'],
    image: FamilyVilla,
  },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const loginAPI = async (email, password) => {
  await delay(1200);
  if (email === 'demo@hotel.com' && password === 'demo123') {
    return { success: true, user: { name: 'Arjun Mehta', email } };
  }
  throw new Error('Invalid credentials. Please try again.');
};

export const checkAvailabilityAPI = async (
  roomId,
  checkIn,
  checkOut,
  existingBookings
) => {
  await delay(900);
  const conflict = existingBookings.some(
    (b) =>
      b.roomId === roomId && !(checkOut <= b.checkIn || checkIn >= b.checkOut)
  );
  return { available: !conflict };
};

export const confirmBookingAPI = async (bookingData) => {
  await delay(800);
  return { success: true, bookingId: `BK-${Date.now()}` };
};

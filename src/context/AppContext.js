import { createContext, useContext, useReducer, useCallback } from 'react';

const AppContext = createContext(null);

const initialState = {
  user: null,
  bookings: [],
  page: 'login',
  selectedRoom: null,
  notification: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, page: 'dashboard' };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_PAGE':
      return { ...state, page: action.payload, selectedRoom: null };
    case 'SELECT_ROOM':
      return { ...state, selectedRoom: action.payload, page: 'room' };
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        page: 'bookings',
        notification: { type: 'success', msg: 'Room booked successfully! 🎉' },
      };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearNotification = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, clearNotification }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

import api from './api';

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export const movieService = {
  getAllMovies: (filters) => api.get('/movies', { params: filters }),
  getMovieById: (movieId) => api.get(`/movies/${movieId}`),
  addMovie: (movieData) => api.post('/movies', movieData),
  updateMovie: (movieId, data) => api.put(`/movies/${movieId}`, data),
  deleteMovie: (movieId) => api.delete(`/movies/${movieId}`)
};

export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBooking: (bookingId) => api.get(`/bookings/${bookingId}`),
  getUserBookings: (userId) => api.get(`/bookings/user/${userId}`),
  cancelBooking: (bookingId) => api.delete(`/bookings/${bookingId}`),
  getAvailableSeats: (showId) => api.get(`/bookings/show/${showId}/available-seats`)
};

export const theaterService = {
  getAllTheaters: (filters) => api.get('/theaters', { params: filters }),
  getTheaterById: (theaterId) => api.get(`/theaters/${theaterId}`),
  addTheater: (theaterData) => api.post('/theaters', theaterData),
  updateTheater: (theaterId, data) => api.put(`/theaters/${theaterId}`, data)
};

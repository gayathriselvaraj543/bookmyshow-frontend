import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    selectedSeats: [],
    selectedShow: null,
    bookingData: null,
    isLoading: false,
    error: null
  },
  reducers: {
    selectSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    selectShow: (state, action) => {
      state.selectedShow = action.payload;
    },
    bookingStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    bookingSuccess: (state, action) => {
      state.isLoading = false;
      state.bookingData = action.payload;
      state.selectedSeats = [];
      state.selectedShow = null;
    },
    bookingFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearBooking: (state) => {
      state.selectedSeats = [];
      state.selectedShow = null;
      state.bookingData = null;
      state.error = null;
    }
  }
});

export const { selectSeats, selectShow, bookingStart, bookingSuccess, bookingFailure, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

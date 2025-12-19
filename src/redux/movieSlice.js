import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    selectedMovie: null,
    isLoading: false,
    error: null
  },
  reducers: {
    fetchMoviesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchMoviesSuccess: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
    },
    fetchMoviesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    }
  }
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure, setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;

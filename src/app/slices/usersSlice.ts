import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: {
      id: '',
      email: ''
    }
  },
  reducers: {
    setUser: (users, action) => {
      users.currentUser = action.payload;
    }
  }
});

export const { setUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for user data
const initialState = {
    userData: null,  // This will hold the current user data
};

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action to save user data
        saveUserData: (state, action) => {
            state.userData = action.payload;
        },
        // Action to clear user data (e.g., on logout)
        clearUserData: (state) => {
            state.userData = null;
        },
    },
});

// Export the actions
export const { saveUserData, clearUserData } = userSlice.actions;

// Export the reducer to include it in the store
export default userSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Import the user slice reducer
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// Redux Persist configuration
const persistConfig = {
    key: 'root',    // The key used to save to storage
    storage,        // Define which storage to use (localStorage in this case)
};

// Persist the user slice
const persistedReducer = persistReducer(persistConfig, userReducer);

// Create the Redux store
const store = configureStore({
    reducer: {
        user: persistedReducer,  // Add user slice to the store
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST"],
            },
    }),
});

export const persistor = persistStore(store);
export default store;

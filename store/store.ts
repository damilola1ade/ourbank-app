// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import authReducer from "../slice/authSlice";
// import { authAPI } from "./auth";
// import { cardAPI } from "./cards";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   [authAPI.reducerPath]: authAPI.reducer,
//   [cardAPI.reducerPath]: cardAPI.reducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authAPI.middleware, cardAPI.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// setupListeners(store.dispatch);


import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PERSIST,
  PURGE,
  REHYDRATE,
} from "redux-persist";
import authReducer from "../slice/authSlice";
import { authAPI } from "./auth";
import { cardAPI } from "./cards";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [cardAPI.reducerPath]: cardAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PERSIST, PURGE],
      },
    }).concat(authAPI.middleware, cardAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

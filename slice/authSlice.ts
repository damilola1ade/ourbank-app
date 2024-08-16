import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthState {
  user: any | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: string; accessToken: string }>
    ) => {
      AsyncStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.user,
          accessToken: action.payload.accessToken,
        })
      );
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      AsyncStorage.clear();
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
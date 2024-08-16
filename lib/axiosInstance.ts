// import { logout } from "@/slice/authSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = "";

    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        accessToken = user.accessToken;
      }

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error("Failed to get user from AsyncStorage", error);
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: { response: { status: number } }) => {
    if (error.response && error.response.status === 401) {
      // Clear user data from AsyncStorage
      try {
        await AsyncStorage.clear();

        // Redirect to login
        // router.replace("/login");
      } catch (error) {
        console.error("Failed to clear AsyncStorage or navigate", error);
      }
    }
    return Promise.reject(error);
  }
);

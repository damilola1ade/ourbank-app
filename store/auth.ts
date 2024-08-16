import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosError } from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import { AuthResponse, SignUpRequest, SignInRequest } from "@/types";

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: any }) =>
  async ({
    url,
    method,
    data,
  }: {
    url?: string;
    method?: string;
    data?: any;
  }) => {
    try {
      const result = await axiosInstance({
        url: `${baseUrl}/${url}`,
        method,
        data,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: error.response ? error.response.data : error.message,
      };
    }
  };

export const authAPI = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation<AuthResponse, SignInRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useLogOutMutation } =
  authAPI;

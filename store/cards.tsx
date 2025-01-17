import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosError } from "axios";
import { axiosInstance } from "../lib/axiosInstance";

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl?: any }) =>
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

export const cardAPI = createApi({
  reducerPath: "cards",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
  tagTypes: ["Card"],
  endpoints: (builder) => ({
    createCard: builder.mutation({
      query: (body) => ({
        url: "card/create-card",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Card"],
    }),

    getAllCards: builder.query({
      query: () => ({
        url: "card/get-all-cards",
        method: "GET",
      }),
      providesTags: ["Card"],
    }),

    revealCard: builder.mutation({
      query: ({ body, cardId }: { body: any; cardId: any }) => ({
        url: `card/reveal-card/${cardId}`,
        method: "POST",
        data: body,
      }),
    }),

    getSingleCard: builder.query({
      query: (cardId) => ({
        url: `card/get-card/${cardId}`,
        method: "GET",
      }),
      providesTags: ["Card"],
    }),

    deleteCard: builder.mutation({
      query: ({ cardId }: { cardId: any }) => ({
        url: `card/delete-card/${cardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Card"],
    }),
  }),
});

export const {
  useCreateCardMutation,
  useGetAllCardsQuery,
  useGetSingleCardQuery,
  useRevealCardMutation,
  useDeleteCardMutation,
} = cardAPI;

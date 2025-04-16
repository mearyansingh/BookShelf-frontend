import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../Helpers'

const baseQuery = fetchBaseQuery({
   baseUrl: `${getBaseUrl()}/api/books`,
   credentials: 'include',
   prepareHeaders: (Headers) => {
      const token = localStorage.getItem('token')
      if (token) {
         Headers.set('Authorization', `Bearer ${token}`)
      }
      return Headers
   }
})

// Define a service using a base URL and expected endpoints
export const booksApi = createApi({
   reducerPath: 'booksApi',
   baseQuery,
   tagTypes: ["Books"],
   refetchOnFocus: true,// 👈 Refetch when tab is focused
   refetchOnReconnect: true,// 👈 Refetch when internet reconnects
   endpoints: (builder) => ({
      fetchAllBooks: builder.query({
         query: () => '/',
         providesTags: ["Books"]
      }),
      fetchBookById: builder.query({
         query: (id) => `/${id}`,
         providesTags: (result, error, id) => [{ type: "Books", id }]
      }),
      addBook: builder.mutation({
         query: (newBook) => ({
            url: '/create-book',
            method: 'POST',
            body: newBook,
         }),
         invalidatesTags: ["Books"]
      }),
      updateBook: builder.mutation({
         query: ({ id, ...rest }) => ({
            url: `/edit/${id}`,
            method: 'PUT',
            body: rest,
            headers: { 'Content-Type': 'application/json' }
         }),
         invalidatesTags: ["Books"]
      }),
      deleteBook: builder.mutation({
         query: (id) => ({
            url: `/${id}`,
            method: 'DELETE',
            // Optional: Add headers if needed for authorization
            // headers: { 'Content-Type': 'application/json' }
            // headers: {
            //    Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your auth mechanism
            // }
         }),
         invalidatesTags: ["Books"]
      }),
   }),
})

export const { useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksApi;
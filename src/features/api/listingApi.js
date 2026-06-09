// features/api/listingApi.js — applyUserSuggestion endpoint DELETE করো
// এটা improvementApi তে আছে, listingApi তে থাকা উচিত না

import { baseApi } from '../baseApi';

export const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createListing: builder.mutation({
      query: (data) => ({ url: '/listings', method: 'POST', body: data }),
      invalidatesTags: ['Listing', 'UserListings'],
      transformResponse: (response) => response.data,
    }),
    getMyListings: builder.query({
      query: (params = {}) => ({ url: '/listings/my', method: 'GET', params }),
      providesTags: ['UserListings'],
      transformResponse: (response) => response.data,
    }),
    getListingById: builder.query({
      query: (id) => ({ url: `/listings/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Listing', id }],
      transformResponse: (response) => response.data?.listing,
    }),
    updateListing: builder.mutation({
      query: ({ id, data }) => ({ url: `/listings/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Listing', id }, 'UserListings'],
      transformResponse: (response) => response.data?.listing,
    }),
    deleteListing: builder.mutation({
      query: (id) => ({ url: `/listings/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [{ type: 'Listing', id }, 'UserListings'],
      transformResponse: (response) => response.data,
    }),
    addPhotos: builder.mutation({
      query: ({ id, photos }) => ({
        url: `/listings/${id}/photos`, method: 'POST', body: { photos },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Listing', id }],
      transformResponse: (response) => response.data?.photos,
    }),
    deletePhoto: builder.mutation({
      query: ({ listingId, photoId }) => ({
        url: `/listings/${listingId}/photos/${photoId}`, method: 'DELETE',
      }),
      invalidatesTags: (result, error, { listingId }) => [{ type: 'Listing', id: listingId }],
      transformResponse: (response) => response.data,
    }),
    // ── ADMIN ──
    getAllListings: builder.query({
      query: (params = {}) => ({ url: '/listings/admin', method: 'GET', params }),
      providesTags: ['AllListings'],
      transformResponse: (response) => response.data,
    }),
    getListingStats: builder.query({
      query: () => ({ url: '/listings/admin/stats', method: 'GET' }),
      providesTags: ['ListingStats'],
      transformResponse: (response) => response.data?.stats,
    }),
    updateListingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/listings/admin/${id}/status`, method: 'PATCH', body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Listing', id }, 'AllListings', 'ListingStats',
      ],
      transformResponse: (response) => response.data?.listing,
    }),
    // applyUserSuggestion এখানে নেই — improvementApi তে আছে ✓
  }),
});

export const {
  useCreateListingMutation,
  useGetMyListingsQuery,
  useGetListingByIdQuery,
  useUpdateListingMutation,
  useDeleteListingMutation,
  useAddPhotosMutation,
  useDeletePhotoMutation,
  useGetAllListingsQuery,
  useGetListingStatsQuery,
  useUpdateListingStatusMutation,
} = listingApi;
// features/api/improvementApi.js
import { baseApi } from '../baseApi';

export const improvementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── USER ENDPOINTS ──────────────────────────────────
    createImprovementRequest: builder.mutation({
      query: (data) => ({
        url: '/improvements',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Improvement', 'Listing'],
      transformResponse: (response) => response.data,
    }),

    getMyImprovementRequests: builder.query({
      query: (params = {}) => ({
        url: '/improvements/my',
        method: 'GET',
        params,
      }),
      providesTags: ['Improvement'],
      transformResponse: (response) => response.data,
    }),

    getImprovementRequestById: builder.query({
      query: (id) => `/improvements/${id}`,
      providesTags: (result, error, id) => [{ type: 'Improvement', id }],
      transformResponse: (response) => response.data?.request,
    }),

    // ← KEY: user suggestion apply, Listing + Generation দুটোই invalidate
    applyUserSuggestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/improvements/${id}/apply-suggestion`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Improvement', id },
        'Listing',       // listing refetch → generatedText update দেখাবে
        'Generation',    // generation cache clear
      ],
      transformResponse: (response) => response.data,
    }),

    // ── ADMIN ENDPOINTS ──────────────────────────────────
    getAllImprovementRequests: builder.query({
      query: (params = {}) => ({
        url: '/improvements/admin/all',
        method: 'GET',
        params,
      }),
      providesTags: ['Improvement-Admin'],
      transformResponse: (response) => response.data,
    }),

    getImprovementStats: builder.query({
      query: () => '/improvements/admin/stats',
      providesTags: ['Improvement-Stats'],
      transformResponse: (response) => response.data?.stats,
    }),

    updateImprovementStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/improvements/admin/${id}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Improvement', id },
        'Improvement-Admin',
        'Improvement-Stats',
        'Listing',
      ],
      transformResponse: (response) => response.data,
    }),

    addSuggestions: builder.mutation({
      query: ({ id, data }) => ({
        url: `/improvements/admin/${id}/suggestions`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Improvement', id },
        'Improvement-Admin',
      ],
      transformResponse: (response) => response.data,
    }),

    completeImprovementRequest: builder.mutation({
      query: ({ id, adminNote }) => ({
        url: `/improvements/admin/${id}/complete`,
        method: 'PATCH',
        body: { adminNote },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Improvement', id },
        'Improvement-Admin',
        'Improvement-Stats',
        'Listing',
      ],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  // user
  useCreateImprovementRequestMutation,
  useGetMyImprovementRequestsQuery,
  useGetImprovementRequestByIdQuery,
  useApplyUserSuggestionMutation,
  // admin
  useGetAllImprovementRequestsQuery,
  useGetImprovementStatsQuery,
  useUpdateImprovementStatusMutation,
  useAddSuggestionsMutation,
  useCompleteImprovementRequestMutation,
} = improvementApi;
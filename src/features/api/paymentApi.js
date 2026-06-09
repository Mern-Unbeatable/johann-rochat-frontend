import { baseApi } from '../baseApi';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckout: builder.mutation({
      query: (data) => ({
        url: '/payments/checkout',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payment', 'Listing'],
      transformResponse: (response) => response.data,
    }),

    createImprovementCheckout: builder.mutation({
      query: (data) => ({
        url: '/payments/improvement-checkout',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payment', 'Listing'],
      transformResponse: (response) => response.data,
    }),

    verifySession: builder.query({
      query: (sessionId) => ({
        url: `/payments/verify?session_id=${sessionId}`,
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),

    // ← FIX: GET থেকে POST করা হয়েছে — cache issue সমাধান
    verifyAndUnlock: builder.mutation({
      query: (sessionId) => ({
        url: '/payments/verify-and-unlock',
        method: 'POST',
        body: { session_id: sessionId },
      }),
      invalidatesTags: ['Payment', 'Listing', 'User'], // User tag add
      transformResponse: (response) => response.data,
    }),

    getPaymentHistory: builder.query({
      query: (params = {}) => ({
        url: '/payments/history',
        method: 'GET',
        params,
      }),
      providesTags: ['Payment'],
      transformResponse: (response) => response.data,
    }),

    getAllPayments: builder.query({
      query: (params = {}) => ({
        url: '/payments/admin/all',
        method: 'GET',
        params,
      }),
      providesTags: ['Payment'],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useCreateCheckoutMutation,
  useCreateImprovementCheckoutMutation,
  useVerifySessionQuery,
  useVerifyAndUnlockMutation,
  useGetPaymentHistoryQuery,
  useGetAllPaymentsQuery,
} = paymentApi;
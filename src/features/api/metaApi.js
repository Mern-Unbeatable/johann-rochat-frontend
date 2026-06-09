import { baseApi } from '../baseApi';

export const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: '/meta/dashboard',
        method: 'GET',
      }),
      providesTags: ['Meta', 'User', 'Payment', 'Listing'],
      transformResponse: (response) => response.data,
    }),
    
    getSimpleStats: builder.query({
      query: () => ({
        url: '/meta/simple',
        method: 'GET',
      }),
      providesTags: ['Meta', 'User', 'Payment', 'Listing'],
      transformResponse: (response) => response.data,
    }),

   
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetSimpleStatsQuery,
} = metaApi;
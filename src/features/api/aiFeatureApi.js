import { baseApi } from '../baseApi';

export const aiFeatureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyAiFeature: builder.mutation({
      query: (data) => ({
        url: '/ai-features/apply',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AiFeature', 'User', 'Generation'],
      transformResponse: (response) => response.data,
    }),
    getMyAiHistory: builder.query({
      query: (params = {}) => ({
        url: '/ai-features/my-history',
        method: 'GET',
        params,
      }),
      providesTags: ['AiFeature'],
      transformResponse: (response) => response.data,
    }),
    getAllAiUsages: builder.query({
      query: (params = {}) => ({
        url: '/ai-features/admin/all',
        method: 'GET',
        params,
      }),
      providesTags: ['AiFeature'],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useApplyAiFeatureMutation,
  useGetMyAiHistoryQuery,
  useGetAllAiUsagesQuery,
} = aiFeatureApi;
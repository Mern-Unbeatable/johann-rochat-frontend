import { baseApi } from '../baseApi';

export const generationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateAd: builder.mutation({
      query: (data) => ({
        url: '/generations/generate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Generation', 'Listing'],
      transformResponse: (response) => response.data,
    }),

    useAiFeature: builder.mutation({
      query: (data) => ({
        url: '/generations/feature',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Generation', 'User'],
      transformResponse: (response) => response.data,
    }),

    getListingGenerations: builder.query({
      query: (listingId) => ({
        url: `/generations/listing/${listingId}`,
        method: 'GET',
      }),
      providesTags: ['Generation'],
      transformResponse: (response) => response.data,
    }),

    getGenerationById: builder.query({
      query: (id) => ({
        url: `/generations/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Generation', id }],
      transformResponse: (response) => response.data,
    }),


    getGenerationByImprovement: builder.query({
      query: (improvementId) => ({
        url: `/generations/admin/improvement/${improvementId}`,
        method: 'GET',
      }),
      providesTags: ['Generation'],
      transformResponse: (response) => response.data,
    }),

    updateGenerationText: builder.mutation({
      query: ({ id, text }) => ({
        url: `/generations/admin/${id}/text`,
        method: 'PATCH',
        body: { text },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Generation', id }],
      transformResponse: (response) => response.data,
    }),
  }),
})


export const {
  useGenerateAdMutation,
  useUseAiFeatureMutation,
  useGetListingGenerationsQuery,
  useGetGenerationByIdQuery,
  useGetGenerationByImprovementQuery,
  useUpdateGenerationTextMutation,
} = generationApi;
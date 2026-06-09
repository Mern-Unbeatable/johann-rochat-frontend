import { baseApi } from '../baseApi';

export const exportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExport: builder.mutation({
      query: (data) => ({
        url: '/exports',
        method: 'POST',
        body: data,
        responseHandler: async (response) => {
          const contentType = response.headers.get('content-type');
          if (contentType === 'application/pdf') {
            const blob = await response.blob();
            return { pdfBlob: blob, isPdf: true };
          }
          const json = await response.json();
          return json.data;
        },
      }),
      invalidatesTags: ['Export'],
      transformResponse: (response) => {
        if (response?.isPdf) {
          return response;
        }
        return response;
      },
    }),

    getMyExports: builder.query({
      query: (params = {}) => ({
        url: '/exports/my',
        method: 'GET',
        params,
      }),
      providesTags: ['Export'],
      transformResponse: (response) => response.data,
    }),

    getAllExports: builder.query({
      query: (params = {}) => ({
        url: '/exports/admin/all',
        method: 'GET',
        params,
      }),
      providesTags: ['Export-Admin'],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useCreateExportMutation, useGetMyExportsQuery, useGetAllExportsQuery } = exportApi;

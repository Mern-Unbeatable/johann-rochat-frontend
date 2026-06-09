import { baseApi } from '../baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: ['User'],
      transformResponse: (response) => response.data.user,
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/users/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response) => response.data.user,
    }),

    deleteMe: builder.mutation({
      query: () => ({
        url: '/users/me',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
      transformResponse: (response) => response.data,
    }),
    
    getMyStats: builder.query({
      query: () => ({
        url: '/users/me/stats',
        method: 'GET',
      }),
      providesTags: ['User', 'Stats'],
      transformResponse: (response) => response.data.stats,
    }),

    getMyCreditHistory: builder.query({
      query: (params = {}) => ({
        url: '/users/me/credits',
        method: 'GET',
        params,
      }),
      providesTags: ['CreditTransaction'],
      transformResponse: (response) => response.data,
    }),

    refreshUserCredits: builder.mutation({
      query: () => ({
        url: '/users/me/refresh-credits',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
      transformResponse: (response) => response.data.user,
    }),

    getAllUsers: builder.query({
      query: (params = {}) => ({
        url: '/users/admin',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result?.users
          ? [
              ...result.users.map(({ id }) => ({ type: 'User', id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
      transformResponse: (response) => response.data,
    }),

    getAdminStats: builder.query({
      query: () => ({
        url: '/users/admin/stats',
        method: 'GET',
      }),
      providesTags: ['AdminStats'],
      transformResponse: (response) => response.data.stats,
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/users/admin/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'User', id }],
      transformResponse: (response) => response.data.user,
    }),

    setUserVerified: builder.mutation({
      query: ({ id, isVerified }) => ({
        url: `/users/admin/${id}/verify`,
        method: 'PATCH',
        body: { isVerified },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'AdminStats' },
        { type: 'Stats' },
      ],
      transformResponse: (response) => response.data.user,
    }),

    adjustCredits: builder.mutation({
      query: ({ id, amount, type, reference }) => ({
        url: `/users/admin/${id}/credits`,
        method: 'PATCH',
        body: { amount, type, reference },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'CreditTransaction' },
        { type: 'Stats' },
        { type: 'AdminStats' },
      ],
      transformResponse: (response) => response.data,
    }),

    // NEW: Assign package to user
    assignPackage: builder.mutation({
      query: ({ id, packageId }) => ({
        url: `/users/admin/${id}/assign-package`,
        method: 'PATCH',
        body: { packageId },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
        { type: 'AdminStats' },
        { type: 'Stats' },
      ],
      transformResponse: (response) => response.data.user,
    }),

    // NEW: Add credits only (without package)
    addCreditsOnly: builder.mutation({
      query: ({ id, amount, reference }) => ({
        url: `/users/admin/${id}/add-credits`,
        method: 'PATCH',
        body: { amount, reference },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
        { type: 'CreditTransaction' },
        { type: 'Stats' },
        { type: 'AdminStats' },
      ],
      transformResponse: (response) => response.data.user,
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
        { type: 'AdminStats' },
      ],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useDeleteMeMutation,
  useGetMyStatsQuery,
  useGetMyCreditHistoryQuery,
  useRefreshUserCreditsMutation, 
  useGetAllUsersQuery,
  useGetAdminStatsQuery,
  useGetUserByIdQuery,
  useSetUserVerifiedMutation,
  useAdjustCreditsMutation,
  useAssignPackageMutation,
  useAddCreditsOnlyMutation,
  useDeleteUserMutation,
} = userApi;
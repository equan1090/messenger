import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"


interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const userSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        signup: builder.mutation<void, SignupRequest>({
            query: (newUser) => ({
                url: `/api/v1/users/signup`,
                method: `POST`,
                body: newUser
            }),
        }),
    }),

  });


  export const { useSignupMutation } = userSlice;

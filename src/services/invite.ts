// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface MaterApiResponse {
  data: Data;
  message: string;
  code: string;
}
interface Data {
  user: User[];
  venue: Venue[];
  event: Event[];
}
interface Event {
  id: number;
  name: string;
}
interface Venue {
  id: number;
  name: string;
  address: string;
}
interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: number;
}

interface inviteeRequestType {
  userId: number;
  venueId: number;
  eventId: number;
  url: string;
}

interface inviteeResponseType {
  data?: inviteeResponseData;
  message: string;
  code: string;
  status: boolean;
}

interface inviteeResponseData {
  id: number;
  user: inviteeResponseUser;
  venue: inviteeResponseVenue;
  event: inviteeResponseEvent;
  status: boolean;
}
interface inviteeResponseEvent {
  id: number;
  name: string;
}
interface inviteeResponseVenue {
  id: number;
  name: string;
  address: string;
}
interface inviteeResponseUser {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface visitRequest {
  id: number;
  invitees_id: number;
  barCode: string;
  isAccepted: boolean;
}

const BaseUrl = process.env.REACT_APP_API_BASE_URL;

// Define a service using a base URL and expected endpoints
export const visitorSystem = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({
    masterApi: builder.query<MaterApiResponse, void>({
      query: () =>
        `getAll`,
    }),
    inviteeRequest: builder.mutation<inviteeResponseType, inviteeRequestType>({
      query: (payload: object) => ({
        url: "invitees",
        method: "POST",
        body: payload,
      }),
    }),
    visitRequest: builder.query<void, visitRequest>({
      query: () => ``,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useMasterApiQuery, useInviteeRequestMutation } = visitorSystem;

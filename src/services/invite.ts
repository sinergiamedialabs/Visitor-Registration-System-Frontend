// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
  id: number;
  user_id: number;
  venue_id: number;
  event_id: number;
  email: string;
  url: string;
  status: boolean;
  emailTrigger: boolean;
}

interface visitRequestType{
  // id: number;
  invitees_id: number;
  barCode: string;
  isAccepted: boolean;
}

interface inviteesDetailsRequest {
  data: Invitees;
  message: string;
  code: string;
}
interface inviteesDetailsData {
  invitees: Invitees;
}
interface Invitees {
  id: number;
  status: boolean;
  user: User;
  venue: Venue;
  event: Event;
}

const BaseUrl = "http://ad5a6b93872024abba528cb02f5a97fe-1839394268.ap-south-1.elb.amazonaws.com"

// Define a service using a base URL and expected endpoints
export const visitorSystem = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({
    masterApi: builder.query<MaterApiResponse, void>({
      query: () => ``,
    }),
    inviteeRequest: builder.query<void, inviteeRequestType>({
      query: () => ``,
    }),
    visitRequest: builder.mutation<void, visitRequestType>({
            query: (data: visitRequestType) => ({
                url: '/saveVisits',
                method: 'POST',
                body: data,
            }),
        }),
        inviteDetails: builder.query<inviteesDetailsRequest, string>({
            query: (invitees_id) => ({
                url: `/getInviteById/${invitees_id}`,
                method: 'GET',
            }),
        }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useMasterApiQuery, useInviteeRequestQuery, useVisitRequestMutation,useInviteDetailsQuery } = visitorSystem
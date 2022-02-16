import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "../features/auth/AuthSlice"
import TicketReducer from "../features/tickets/TicketSlice"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    ticket: TicketReducer,
  },
})

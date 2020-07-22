import { FLIGHTS_LIST_RECIEVED } from "./flights.actions";

const initialState = {
  flightsList: [],
  date: null,
};

const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FLIGHTS_LIST_RECIEVED:
      return {
        ...state,
        flightsList: action.payload.flightsList.body,
        date: action.payload.date,
      };
    default:
      return state;
  }
};

export default flightsReducer;

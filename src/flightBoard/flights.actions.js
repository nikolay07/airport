import { fetchFlights } from "./flights.gateway";

export const FLIGHTS_LIST_RECIEVED = "TASKS_LIST_RECIEVED";

export const flightsListRecieved = (flightsList, date) => {
  return {
    type: FLIGHTS_LIST_RECIEVED,
    payload: { flightsList, date },
  };
};

export const fetchFlightsList = (date) => {
  return (dispatch) => {
    fetchFlights(date).then((flightsList) => {
      dispatch(flightsListRecieved(flightsList, date));
    });
  };
};

import React from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import qs from "qs";
import PropTypes from "prop-types";
import { departureSelector, arrivalSelector } from "../../flights.selectors";
import Flight from "../Flights/Flight";
import { createFlight } from "./createFlight";

const FlightsList = ({ departureFlightsList, arrivalFlightsList }) => {
  const { direction } = useParams();
  const location = useLocation();

  const filterFlightsList = (flightList, queryString) => {
    if (!queryString) return flightList;
    return flightList.filter((flight) => {
      const fltNo = `${flight["carrierID.IATA"]}${flight.fltNo}`;
      return fltNo.toLowerCase().includes(queryString.toLowerCase());
    });
  };

  const createFlightsList = (flights, flightDirection) => {
    return flights.map((flight) => {
      const formatFlight = createFlight(flight, flightDirection);
      const { term, fltNo, name, logoUrl, airportName, localTime, timeStatus, status } = formatFlight;
      return (
        <Flight
          key={flight.ID}
          term={term}
          fltNo={fltNo}
          airportName={airportName}
          localTime={localTime}
          timeStatus={timeStatus}
          status={status}
          name={name}
          logoUrl={logoUrl}
        />
      );
    });
  };

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const filterArrivals = filterFlightsList(arrivalFlightsList, query.search);
  const filterDepartures = filterFlightsList(departureFlightsList, query.search);

  return (
    <>
      {direction && direction.includes("arrivals")
        ? createFlightsList(filterArrivals, direction)
        : createFlightsList(filterDepartures, direction)}
    </>
  );
};

const mapState = (state) => {
  return {
    departureFlightsList: departureSelector(state),
    arrivalFlightsList: arrivalSelector(state),
  };
};

export default connect(mapState, null)(FlightsList);

FlightsList.propTypes = {
  departureFlightsList: PropTypes.arrayOf(PropTypes.shape).isRequired,
  arrivalFlightsList: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import qs from "qs";
import PropTypes from "prop-types";
import { departureSelector, arrivalSelector } from "../../flights.selectors";
import Flight from "../Flights/Flight";
import { createFlight } from "./createFlight";

const FlightsList = ({ departureFlightsList, arrivalFlightsList }) => {
  const [flightsList, setFlightsList] = useState([]);
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
      const data = createFlight(flight, flightDirection);
      const { term, fltNo, name, logoUrl, airportName, localTime, timeStatus } = data;
      return (
        <Flight
          key={flight.ID}
          term={term}
          fltNo={fltNo}
          airportName={airportName}
          localTime={localTime}
          timeStatus={timeStatus}
          status={data.status}
          name={name}
          logoUrl={logoUrl}
        />
      );
    });
  };
  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (direction && direction.includes("arrivals")) {
      setFlightsList(filterFlightsList(arrivalFlightsList, query.search));
    } else {
      setFlightsList(filterFlightsList(departureFlightsList, query.search));
    }
  }, [location, departureFlightsList, arrivalFlightsList, direction]);

  return <>{createFlightsList(flightsList, direction)}</>;
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

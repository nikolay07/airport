import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import qs from "qs";
import PropTypes from "prop-types";
import { departureSelector, arrivalSelector } from "../flights.selectors";
import { fetchFlightsList } from "../flights.actions";
import Flight from "./Flight";

const FlightsList = ({ departureFlightsList, arrivalFlightsList }) => {
  const [flightsList, setFlightsList] = useState([]);
  const [status, setStatus] = useState("");
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
      let data = {
        term: flight.term,
        fltNo: `${flight["carrierID.IATA"]}${flight.fltNo}`,
        airportName: flight["airportToID.name_en"] || flight["airportFromID.name_en"],
        localTime: flight.timeDepShedule,
        timeStatus: flight.timeTakeofFact,
        status: flight.status,
        name: flight.airline.en.name,
        logoUrl: flight.airline.en.logoSmallName,
      };
      if (flightDirection === "arrivals") {
        data = {
          ...data,
          localTime: flight.timeToStand,
          timeStatus: flight.timeLandFact,
        };
      }
      return (
        <Flight
          key={flight.ID}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...data}
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
      setStatus("arrivals");
    } else {
      setFlightsList(filterFlightsList(departureFlightsList, query.search));
      setStatus("departures");
    }
  }, [location, departureFlightsList, arrivalFlightsList, direction]);

  return <>{createFlightsList(flightsList, status)}</>;
};

const mapState = (state) => {
  return {
    departureFlightsList: departureSelector(state),
    arrivalFlightsList: arrivalSelector(state),
  };
};

const mapDispatch = {
  getFlightsList: fetchFlightsList,
};

export default connect(mapState, mapDispatch)(FlightsList);

FlightsList.propTypes = {
  departureFlightsList: PropTypes.arrayOf(PropTypes.shape),
  arrivalFlightsList: PropTypes.arrayOf(PropTypes.shape),
};
FlightsList.defaultProps = {
  departureFlightsList: [],
  arrivalFlightsList: [],
};

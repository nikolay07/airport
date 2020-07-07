import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import FlightsList from "./FlightsList";

function FlightsTable() {
  const [status, setStatus] = useState("departures");
  const location = useLocation();
  const departureClass =
    status === "departures" ? "flights-list__btn_active" : "";
  const arrivalClass =
    status === "arrivals" ? "flights-list__btn_active" : "";

  useEffect(() => {
    if (location.pathname.includes("arrivals")) {
      setStatus("arrivals");
    } else {
      setStatus("departures");
    }
  }, [location]);

  return (
    <div className="flights-list">
      <div className="flights-list__switcher">
        <Link
          to={`/departures${location.search}`}
          className={`flights-list__btn flights-list__btn_departures ${departureClass}`}
        >
          <i className="material-icons">flight_takeoff</i>
          Departures
        </Link>
        <Link
          to={`/arrivals${location.search}`}
          className={`flights-list__btn flights-list__btn_arrivals ${arrivalClass}`}
        >
          <i className="material-icons">flight_land</i>
          Arrivals
        </Link>
      </div>
      <div className="flights-list__table-wrapper">
        <table className="flights-list__table flights-table">
          <thead className="flights-table__header">
            <tr>
              <th>Terminal</th>
              <th>Local time</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Airline</th>
              <th>Flight</th>
            </tr>
          </thead>
          <tbody>
            <Switch>
              <Route path={`/:direction?`} component={FlightsList} />
            </Switch>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FlightsTable;

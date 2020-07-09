import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

const Flight = ({ term, fltNo, status, name, logoUrl, airportName, localTime, timeStatus }) => {
  const myLocalTime = moment(localTime).format("HH:mm");
  const myTimeStatus = moment(timeStatus).format("HH:mm");

  const setStatus = () => {
    switch (status) {
      case "DP":
        return `Departed at ${myTimeStatus}`;
      case "ON":
        return "On time";
      case "CX":
        return "Cancelled";
      case "CK":
        return "Check-in";
      case "GC":
        return "Gate closed";
      case "FR":
        return "In flight";
      case "LN":
        return `Landed ${myTimeStatus}`;
      default:
        return "Not found";
    }
  };

  return (
    <tr>
      <td className="terminal-field">
        <span className={term === "D" ? "terminal blue" : "terminal"}>{term}</span>
      </td>
      <td className="time-field">{myLocalTime}</td>
      <td className="way-field">
        <span>{airportName}</span>
      </td>
      <td className="status-field">
        <span>{setStatus()}</span>
      </td>
      <td className="company-name">
        <span className="logo">
          <img src={logoUrl} alt={name} />
          <span>{name}</span>
        </span>
      </td>
      <td className="flight-field">
        <span>{`${fltNo}`}</span>
      </td>
    </tr>
  );
};

export default Flight;

Flight.propTypes = {
  term: PropTypes.string.isRequired,
  fltNo: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  airportName: PropTypes.string.isRequired,
  localTime: PropTypes.string.isRequired,
  timeStatus: PropTypes.string.isRequired,
};

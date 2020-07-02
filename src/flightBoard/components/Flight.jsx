import React from "react";
import moment from "moment";

const Flight = (props) => {
  const { term, fltNo, status, name, logoUrl, airportName } = props;
  const localTime = moment(props.localTime).format("HH:mm");
  const timeStatus = moment(props.timeStatus).format("HH:mm");

  const newStatus = () => {
    switch (status) {
      case "DP":
        return `Departed at ${timeStatus}`;
      case "ON":
        return "On time";
      case "CX":
        return "Cancelled";
      case "CK":
        return "Check-in";
      case "GC":
        return "Gate closed";
      case "LN":
        return `Landed ${timeStatus}`;
      default:
        return "Not found";
    }
  };

  return (
    <tr>
      <td className="terminal-field">
        <span className={term === "D" ? "terminal blue" : "terminal"}>
          {term}
        </span>
      </td>
      <td className="time-field">{localTime}</td>
      <td className="way-field">
        <span>{airportName}</span>
      </td>
      <td className="status-field">
        <span>{newStatus()}</span>
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

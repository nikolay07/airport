export const getFlightStatus = (status, myTimeStatus) => {
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

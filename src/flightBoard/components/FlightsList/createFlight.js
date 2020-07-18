export const createFlight = (flight, flightDirection) => {
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
  return data;
};

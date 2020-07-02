import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as flightsActions from "../flights.actions";
import moment from "moment";
import SearchField from "./SearchField";
import FlightsTable from "./FlightsTable";

function SearchFlightsPage({ fetchFlightsList }) {
  useEffect(() => {
    fetchFlightsList(moment().format("DD-MM-YYYY"));
  }, []);

  return (
    <>
      <SearchField />
      <FlightsTable />
    </>
  );
}

const mapDispatchToProps = {
  fetchFlightsList: flightsActions.fetchFlightsList,
};

export default connect(null, mapDispatchToProps)(SearchFlightsPage);

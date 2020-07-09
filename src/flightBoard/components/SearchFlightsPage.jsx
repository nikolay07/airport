import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as flightsActions from "../flights.actions";
import SearchField from "./SearchField";
import FlightsTable from "./FlightsTable";

function SearchFlightsPage({ fetchFlightsList }) {
  useEffect(() => {
    fetchFlightsList(moment().format("DD-MM-YYYY"));
  }, [fetchFlightsList]);

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

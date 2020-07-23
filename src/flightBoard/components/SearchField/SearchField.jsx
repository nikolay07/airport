import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { dateSelector } from "../../flights.selectors";

function SearchField({ date }) {
  const location = useLocation();
  const [flightID, setflightID] = useState(() => {
    const num = location.search.substr(13, 1) === "&" ? 5 : 6;
    return location.search.length > 28 ? `${location.search.substr(8, num)}` : " ";
  });

  return (
    <div className="search-field">
      <h2 className="search-field__title">Search flight</h2>
      <div className="search-field__form">
        <i className="material-icons search-field__icon">search</i>
        <input
          type="text"
          className="search-field__input"
          placeholder="Airline, destination or flight #"
          value={flightID}
          onChange={(event) => setflightID(event.target.value)}
        />

        <Link to={`${location.pathname}?search=${flightID}&date=${date}`}>
          <button className="search-field__btn" type="submit">
            SEARCH
          </button>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    date: dateSelector(state),
  };
};

export default connect(mapStateToProps)(SearchField);

SearchField.propTypes = {
  date: PropTypes.string,
};
SearchField.defaultProps = {
  date: "",
};

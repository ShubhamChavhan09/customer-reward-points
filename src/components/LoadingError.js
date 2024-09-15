import React from "react";
import "./LoadingError.css";

const LoadingError = ({ isLoading, isError }) => {
  if (isLoading) {
    return (
      <div className="loading-error-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="loading-error-container">
        <p className="error-text">
          Error: Unable to load data. Please try again later.
        </p>
      </div>
    );
  }

  return null;
};

export default LoadingError;

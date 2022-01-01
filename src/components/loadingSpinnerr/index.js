import React from "react";
import "./styles.css";

export const LoadingSpinner = () => {
  return (
    <div class="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default LoadingSpinner;

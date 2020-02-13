import React from "react";
import { useLocation } from "react-router-dom";

const AddDrink = () => {
  const { state = {} } = useLocation();
  const selectedDay = state.selectedDay || new Date();
  return (
    <div>
      <h1>Add Beer</h1>
    </div>
  );
};

export default AddDrink;

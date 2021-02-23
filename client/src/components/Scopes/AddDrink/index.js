import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { postRequest } from "@/utils/api";

import Search from "./steps/Search";
import CustomBeer from "./steps/CustomBeer";
import FillBeer from "./steps/FillBeer";

const SwitchSteps = {
  0: (rest) => <Search {...rest} />,
  1: (rest) => <CustomBeer {...rest} />,
  3: (rest) => <FillBeer {...rest} />,
};

const AddDrink = ({ className }) => {
  const { state = {} } = useLocation();
  const history = useHistory();
  const date = state.date || new Date();
  const [step, setStep] = useState({ index: 0 });
  const [form, setForm] = useState({
    date,
    beer: {},
    quantity: 330,
  });

  const registerDrink = async () => {
    const beer = { ...form.beer, family: form?.beer?.family?._id };
    const response = await postRequest("/api/user/drinks/add", {
      ...form,
      beer,
    });
    history.push("/");
  };

  return (
    <div className={className}>
      {SwitchSteps[step.index]({ step, setStep, form, setForm, registerDrink })}
    </div>
  );
};

export default styled(AddDrink)(({ theme: { device } }) => css``);

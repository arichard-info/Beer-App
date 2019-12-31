import React, { useContext } from "react";
import { ThemeProvider, ThemeContext } from "styled-components";
import theme from "./theme.json";

const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

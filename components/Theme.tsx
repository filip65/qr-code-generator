"use client";

import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Theme: React.FC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;

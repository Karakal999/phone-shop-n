import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import "./index.css";

const antTheme = {
  token: {
    colorPrimary: "#ba5536",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#f5222d",
    colorInfo: "#693d3d",
    borderRadius: 8,
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={antTheme}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Router } from "react-router";
import StoreContextProvier from "./context/StoreContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvier>
      <App />
    </StoreContextProvier>
  </BrowserRouter>
);

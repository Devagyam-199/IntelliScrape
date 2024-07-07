import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="devmistry.us.auth0.com"
    clientId="CUHAUinX3id3GPtOoAt9n9t9YCYOoXkB"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);

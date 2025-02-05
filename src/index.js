import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productcontex";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));

const domain = 'dev-qpa8788vb0c0aq3a.us.auth0.com';
const clientId = 'zKVIfnqahCLgYV7iocQgE2QgTzzjyful';

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    >
    <AppProvider>
      <FilterContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>
  </Auth0Provider>
);

reportWebVitals();

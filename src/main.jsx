import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { UserProvider } from "./presentation/context/UserContext";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </HelmetProvider>
);

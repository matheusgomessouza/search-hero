import { BrowserRouter } from "react-router-dom";
import { FooterComponent } from "./components/Footer/FooterComponent";
import { Router } from "./pages/routes";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

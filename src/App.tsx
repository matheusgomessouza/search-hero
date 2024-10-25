import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { FooterComponent } from "@/components/Footer/FooterComponent";
import { Router } from "@/pages/routes";
import "@/styles/global.css";

const theme = {
  textColorOne: "#004295",
  textColorTwo: "#FFFF",
  textColorThree: "#757575",
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Router />
        <FooterComponent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

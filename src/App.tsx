import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import { Router } from "./pages/routes";
import "./styles/global.css";

function App() {
	return (
		<BrowserRouter>
			<Router />
			<Footer />
		</BrowserRouter>
	);
}

export default App;

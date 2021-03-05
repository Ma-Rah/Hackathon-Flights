import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./Pages/Index";
import Navbar from "./Components/Navbar";
import Search from "./Pages/Search";
import Flights from "./Pages/Flights";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route component={Index} path="/" exact />
					<Route component={Flights} path="/flights" />
					<Route component={Search} path="/search" />
					{/* <Route component={FlightDetails} path="/flights/:slug" /> */}
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;

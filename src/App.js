import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Pages/Components/Navbar";
import Search from "./Pages/Search";
import TopFlights from "./Pages/TopFlights";

function App() {
	return (
		<BrowserRouter>
			<Navbar />

			<main className="flex justify-center text-center ">
				<div className="w-full md:w-3/4">
					<Switch>
						<Route component={TopFlights} path="/" exact />
						<Route component={Search} path="/search" />
					</Switch>
				</div>
			</main>
		</BrowserRouter>
	);
}

export default App;

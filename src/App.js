import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Pages/Components/Navbar";
// import Search from "./Pages/Search"; WIP
import TopFlights from "./Pages/TopFlights";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<main className="flex justify-center text-center ">
					<div className="w-full lg:w-1/2">
						<Route component={TopFlights} path="/" exact />
						{/* <Route component={Search} path="/search" /> */}
					</div>
				</main>
			</Switch>
		</BrowserRouter>
	);
}

export default App;

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Pages/Components/Navbar";
// import Search from "./Pages/Search"; WIP
import TopFlights from "./Pages/TopFlights";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<main className=" min-h-screen flex justify-center text-center ">
					<div className="w-full sm:w-1/2 m-5 ">
						<Route component={TopFlights} path="/" exact />
						{/* <Route component={Search} path="/search" /> */}
					</div>
				</main>
			</Switch>
		</BrowserRouter>
	);
}

export default App;

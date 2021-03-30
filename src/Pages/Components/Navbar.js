import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<nav className="p-2 bg-blue-900 text-white flex flex-col sm:flex-row justify-center text-center">
			<NavLink
				to="/"
				exact
				activeStyle={{
					fontWeight: "bold",
					fontSize: "2rem",
				}}
				className="text-2xl px-2"
			>
				Flight Finder
			</NavLink>

			<NavLink
				to="/search"
				activeStyle={{
					fontWeight: "bold",
					fontSize: "2rem",
				}}
				className="text-2xl px-2"
			>
				Search Flights
			</NavLink>
		</nav>
	);
}

export default Navbar;

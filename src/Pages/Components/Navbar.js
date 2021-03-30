import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<nav className="p-2 bg-blue-900 text-white flex justify-center text-center">
			<NavLink
				to="/"
				exact
				activeStyle={{
					fontWeight: "bold",
					color: "tomato",
				}}
				className="text-lg px-2 w-1/2 lg:w-1/4  xl:w-1/6"
			>
				Top Flights
			</NavLink>
			|
			<NavLink
				to="/search"
				activeStyle={{
					fontWeight: "bold",
					color: "tomato",
				}}
				className="text-lg px-2  w-1/2  lg:w-1/4 xl:w-1/6"
			>
				Search Flights
			</NavLink>
		</nav>
	);
}

export default Navbar;

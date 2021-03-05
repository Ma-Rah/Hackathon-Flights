import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<nav className="p-5 bg-gray-500 text-white">
			<NavLink
				exact
				to="/"
				activeStyle={{
					fontWeight: "bold",
					color: "tomato",
				}}
				className="text-3xl px-2"
			>
				Home
			</NavLink>

			{/* <NavLink
				to="/search"
				activeStyle={{
					fontWeight: "bold",
					color: "red",
				}}
				className="text-2xl px-2"
			>
				Search
			</NavLink> */}

			<NavLink
				to="/flights"
				activeStyle={{
					fontWeight: "bold",
					color: "tomato",
				}}
				className="text-2xl px-2"
			>
				Flights
			</NavLink>
		</nav>
	);
}

export default Navbar;

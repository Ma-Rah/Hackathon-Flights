import React, { useState, useEffect } from "react";
import Flights from "./Components/Flights";
import TopFlightsList from "./Components/TopFlightsList";

function TopFlights() {
	// State section
	const [searchResults, setSearchResults] = useState([]);
	const [destination, setDestination] = useState(null);
	const [flights, setFlights] = useState([]);
	const [directFlight, setDirectFlight] = useState(0);
	const [sorting, setSorting] = useState("quality");
	const [isLoading, setIsLoading] = useState(false);

	// variables
	const sortingOptions = ["price", "duration", "quality"];

	// props
	const flightProps = {
		flights: flights,
		isLoading: isLoading,
		sorting: sorting,
		sortingOptions: sortingOptions,
		setDestination: setDestination,
	};

	const listProps = {
		destination: destination,
		searchResults: searchResults,
		setDestination: setDestination,
	};

	// Fetch data
	async function fetchDataSearch() {
		const response = await fetch(
			`https://api.skypicker.com/locations?type=top_destinations&term=prague_cz&locale=en-US&limit=100&sort=sort=name&active_only=true&source_popularity=searches&fallback_popularity=bookings`
		);
		const data = await response.json();
		setSearchResults(data.locations);
	}

	async function fetchFlights() {
		const response = await fetch(
			`https://api.skypicker.com/flights?&locale=en-US&fly_from=PRG&fly_to=${destination}&partner=picky&limit=10&direct_flights=${directFlight}&sort=${sorting}`
		);
		const data = await response.json();
		setFlights(data.data);
	}

	//run fetch on page load
	useEffect(() => {
		fetchDataSearch();
	}, []);

	useEffect(() => {
		setIsLoading(false);
	}, [flights]);

	useEffect(() => {
		setIsLoading(true);

		fetchFlights();
	}, [sorting, directFlight, destination]); //eslint-disable-line react-hooks/exhaustive-deps

	if (searchResults.length === 0) {
		return <div>Loading...</div>;
	} else if (flights) {
		return (
			<div className="flex justify-center flex-col flex-nowrap">
				{/* Sorting */}
				<div className="flex flex-col justify-center items-center ">
					<div className="flex flex-col justify-center items-center bg-white w-3/4">
						<button onClick={() => setDestination(null)}>⬅ Back to top destinations</button>
						<span className=" text-xl ">Sort by:</span>
						<form className="m-2 text-gray-800 text-lg flex bg-white p-2 ">
							{" "}
							<span className="px-2">
								<select
									onChange={(e) => {
										setSorting(e.target.value);
										setIsLoading(true);
									}}
									defaultValue={sorting}
									className=" w-full border bg-white "
								>
									{sortingOptions.map((r, i) => (
										<option key={i} value={r}>
											{r.charAt(0).toUpperCase() + r.slice(1)}
										</option>
									))}
								</select>
							</span>
							<span className="px-2">
								<input
									type="checkbox"
									defaultChecked={directFlight}
									onChange={() => setDirectFlight(!directFlight)}
								/>{" "}
								Direct
							</span>
						</form>
					</div>
				</div>
				{isLoading ? (
					<h2 className="text-2xl p-1 text-black ">Loading results...</h2>
				) : (
					<>
						<Flights flightProps={flightProps} />
					</>
				)}
			</div>
		);
	} else {
		return (
			<>
				<TopFlightsList listProps={listProps} />
			</>
		);
	}
}

export default TopFlights;

import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
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

	// Fetch top destinations
	async function fetchDataSearch() {
		const response = await fetch(
			`https://api.skypicker.com/locations?type=top_destinations&term=prague_cz&locale=en-US&limit=100&sort=sort=name&active_only=true&source_popularity=searches&fallback_popularity=bookings`
		);
		const data = await response.json();
		setSearchResults(data.locations);
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

		async function fetchFlights() {
			const response = await fetch(
				`https://api.skypicker.com/flights?&locale=en-US&fly_from=PRG&fly_to=${destination}&partner=picky&limit=10&direct_flights=${directFlight}&sort=${sorting}`
			);
			const data = await response.json();
			setFlights(data.data);
		}
		fetchFlights();
	}, [destination, sorting, directFlight]);

	if (searchResults.length === 0) {
		return <div className="bg-white p-4">Loading...</div>;
	} else if (flights) {
		return (
			<div className="flex justify-center flex-col flex-nowrap">
				<button
					onClick={() => setDestination(null)}
					className="my-2 text-xl bg-white p-2 rounded self-center"
				>
					⬅ Back to top destinations
				</button>
				<Filter
					setSorting={setSorting}
					setIsLoading={setIsLoading}
					setDirectFlight={setDirectFlight}
					sorting={sorting}
					directFlight={directFlight}
					isLoading={isLoading}
				/>

				{!isLoading && <Flights flights={flights} sorting={sorting} />}
			</div>
		);
	} else {
		return (
			<>
				<TopFlightsList
					destination={destination}
					searchResults={searchResults}
					setDestination={setDestination}
				/>
			</>
		);
	}
}

export default TopFlights;

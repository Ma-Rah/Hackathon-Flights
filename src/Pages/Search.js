import React, { useEffect, useState } from "react";
import Flights from "./Components/Flights";
import Filter from "./Components/Filter";

function Search() {
	// state section
	const [flights, setFlights] = useState([]);

	const [directFlight, setDirectFlight] = useState(0);
	const [sorting, setSorting] = useState("quality");
	const [isLoading, setIsLoading] = useState(false);

	const [origin, setOrigin] = useState(null);
	const [originSearch, setOriginSearch] = useState([]);

	const [destinationSearch, setDestinationSearch] = useState("");
	const [destination, setDestination] = useState(null);

	const [from, setFrom] = useState([]);
	const [to, setTo] = useState([]);

	async function fetchDataSearch() {
		setIsLoading(true);
		const response = await fetch(
			`https://api.skypicker.com/flights?&locale=en-US&fly_from=${origin}&fly_to=${destination}&partner=picky&limit=10&direct_flights=${directFlight}&sort=${sorting}`
		);
		const data = await response.json();
		setFlights(data.data);
	}

	async function fetchLocations() {
		const originLocations = await fetch(
			`https://api.skypicker.com/locations?term=${originSearch}&locale=en-US&location_types=airport&active_only=true&sort=name`
		);

		const destinationLocations = await fetch(
			`https://api.skypicker.com/locations?term=${destinationSearch}&locale=en-US&location_types=airport&active_only=true&sort=name`
		);

		const originData = await originLocations.json();
		const destinationData = await destinationLocations.json();

		if (originData.results_retrieved > 0) {
			setFrom(originData.locations);
			setOrigin(originData.locations[0].id);
		} else {
			setFrom([]);
		}

		if (destinationData.results_retrieved > 0) {
			setTo(destinationData.locations);
			setDestination(destinationData.locations[0].id);
		} else {
			setTo([]);
		}
	}

	function searchLocations(e) {
		e.preventDefault();
		if (originSearch && destinationSearch) {
			fetchLocations();
		} else {
			return;
		}
	}

	useEffect(() => {
		setIsLoading(false);
	}, [flights]);

	useEffect(() => {
		fetchDataSearch(); // eslint-disable-next-line
	}, [sorting, directFlight]);

	return (
		<div className=" flex flex-col text-black md:mx-2">
			<form onSubmit={searchLocations} className="bg-white p-2">
				<div className="grid grid-cols-1 grid-rows-2 ">
					<div className="w-full flex justify-center my-1 ">
						<input
							type="text"
							onChange={(e) => setOriginSearch(e.target.value)}
							className="w-1/3 border mr-1"
							placeholder=" From"
						/>

						<select
							onChange={(e) => setOrigin(e.target.value)}
							className="w-2/3 bg-white border"
							value={origin || ""}
						>
							{from && from.length > 0 ? (
								from.map((r, i) => (
									<option key={i} value={r.id}>
										{r.city.name} - {r.name}
									</option>
								))
							) : (
								<option>No results</option>
							)}
						</select>
					</div>
					<div className="w-full flex justify-center my-1  ">
						<input
							type="text"
							onChange={(e) => setDestinationSearch(e.target.value)}
							className="w-1/3 border mr-1 "
							placeholder=" To"
						/>

						<select
							onChange={(e) => setDestination(e.target.value)}
							className=" w-2/3 bg-white border "
							value={destination || ""}
						>
							{to && to.length > 0 ? (
								to.map((r, i) => (
									<option key={i} value={r.id}>
										{r.city.name} - {r.name}
									</option>
								))
							) : (
								<option>No results</option>
							)}
						</select>
					</div>

					<div className="flex justify-center mt-1">
						<input
							type="submit"
							name=""
							id=""
							value="Find Locations"
							className="bg-blue-600 p-2 rounded mx-1 text-white shadow"
						/>
						{origin && destination ? (
							<input
								type="button"
								onClick={fetchDataSearch}
								value="Search Flights"
								className="bg-green-600 p-2 rounded mx-1 text-white shadow"
							/>
						) : null}
					</div>
				</div>
			</form>

			{isLoading ? (
				<h2 className="text-lg p-1 text-green-600 bg-white ">Loading results...</h2>
			) : (
				<>
					<Filter
						setSorting={setSorting}
						setIsLoading={setIsLoading}
						setDirectFlight={setDirectFlight}
						sorting={sorting}
						directFlight={directFlight}
						isLoading={isLoading}
					/>
					{flights && flights.length > 0 ? (
						<Flights flights={flights} sorting={sorting} />
					) : flights && flights.length === 0 ? (
						<div className="bg-white text-2xl p-2 text-red-500">No flights found</div>
					) : null}
				</>
			)}
		</div>
	);
}

export default Search;

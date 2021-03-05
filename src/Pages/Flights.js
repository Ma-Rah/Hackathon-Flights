import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Flight from "../Components/Flight";

function Flights() {
	const [searchResults, setSearchResults] = useState([]);
	// const [flights, setFlights] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [origin, setOrigin] = useState("PRG");
	const [destination, setDestination] = useState("VLC");
	const [number, setNumber] = useState(20);
	const [directFlight, setDirectFlight] = useState(0);

	const originCities = ["PRG", "SXF", "WAW", "PED", "AAA"]; // AAA is not valid
	const destinationCities = ["VLC", "BCN", "MAD", "MXP", "ATH"];
	const numberResults = [10, 20, 30, 40, 50];

	async function fetchDataSearch() {
		const response = await fetch(
			`https://api.skypicker.com/flights?fly_from=${origin}&fly_to=${destination}&partner=picky&limit=${number}&direct_flights=${directFlight}`
		);
		const data = await response.json();
		try {
			setSearchResults(data && data.data);
			console.log(data.data);
			setIsLoading(false);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		fetchDataSearch();
	}, []);

	function filter() {
		// setDirectFlight(true) ? console.log("checked") : null;
		fetchDataSearch();
	}

	return (
		<main className="justify-center align-center p-5 ">
			<h1 className="text-5xl col-span-3 text-center py-5 text-blue-500">All Flights</h1>
			{/* origin form */}
			<section className="flex justify-center items-center ">
				<label>
					Results:
					<form className="border m-2">
						{" "}
						<select onChange={(e) => setNumber(e.target.value)} defaultValue={number}>
							{numberResults.map((r, i) => (
								<option key={i} value={r}>
									Showing {r} Results
								</option>
							))}
						</select>
					</form>
				</label>
				<label>
					From:
					<form className="border m-2">
						{" "}
						<select onChange={(e) => setOrigin(e.target.value)}>
							{originCities.map((r, i) => (
								<option key={i} value={r}>
									{r}
								</option>
							))}
						</select>
					</form>
				</label>
				{/* destination form */}
				<label>
					To:
					<form className="border m-2">
						{" "}
						<select onChange={(e) => setDestination(e.target.value)}>
							{destinationCities.map((r, i) => (
								<option key={i} value={r}>
									{r}
								</option>
							))}
						</select>
					</form>
				</label>
				{/* Direct flight filter */}

				{/* <label>
					{" "}
					Direct Flights
					<form className="mx-2">
						<input
							type="checkbox"
							name="direct"
							id=""
							defaultChecked={directFlight}
							onChange={() => setDirectFlight(1)}
						/>
					</form>
				</label> */}

				{/* Search with filter */}
				<button className="border bg-green-300  p-1" onClick={filter}>
					Filter
				</button>
			</section>
			{/* search results */}

			{isLoading ? (
				<h1>Loading...</h1>
			) : searchResults.length === 0 ? (
				<h2>No results</h2>
			) : (
				<Flight searchResults={searchResults} />
			)}
		</main>
	);
}

export default Flights;

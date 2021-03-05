import React, { useEffect, useState } from "react";

function Filter({ item }) {
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [origin, setOrigin] = useState("PRG");
	const [destination, setDestination] = useState("VLC");
	const [number, setNumber] = useState(20);
	const [directFlight, setDirectFlight] = useState("All flights");

	const originCities = ["PRG", "SXF", "WAW", "PED", "AAA"]; // AAA is not valid
	const destinationCities = ["VLC", "BCN", "MAD", "MXP", "ATH"];
	const numberResults = [5, 10, 20, 30, 40, 50];
	const directOrTransfer = ["All flights", "Direct"];

	async function fetchDataSearch() {
		const response = await fetch(
			`https://api.skypicker.com/flights?fly_from=${origin}&fly_to=${destination}&partner=picky&limit=${number}&direct_flights=${
				directFlight === "Direct" ? 1 : 0
			}`
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

	function filter() {
		fetchDataSearch();
	}

	return (
		<div>
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

				<label>
					{" "}
					Direct Flights
					<form className="border m-2">
						{" "}
						<select onChange={(e) => setDirectFlight(e.target.value)}>
							{directOrTransfer.map((r, i) => (
								<option key={i} value={r}>
									{r}
								</option>
							))}
						</select>
					</form>
				</label>

				{/* Search with filter */}
				<button className="border bg-green-300  p-1" onClick={filter}>
					Filter
				</button>
			</section>
		</div>
	);
}

export default Filter;

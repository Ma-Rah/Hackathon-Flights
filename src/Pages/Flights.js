import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Flight from '../Components/Flight';


function Flights() {
	const [searchResults, setSearchResults] = useState([]);
	// const [flights, setFlights] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [origin, setOrigin] = useState("PRG");
	const [destination, setDestination] = useState("VLC");

	const originCities = ["PRG", "SXF", "WAW", "PED", 'AAA'];
	const destinationCities = ["VLC", "BCN", "MAD", "MXP", "ATH"];

	/* <select className="p-2" setOrigin={selectValue} onChange={this.handleChange}>
	<option value="">Filter by Origin</option>
	<option value="PRG">Prague</option>
	<option value="Berlin">Berlin</option>
	<option value="Warsaw">Warsaw</option>
	<option value="Pardubice">Pardubice</option>
	</select> */

	// <form className="px-2">
	// 	<select className="p-2">
	// 		<option value="">Filter by Destination</option>
	// 		<option value="Valencia">Valencia</option>
	// 		<option value="Barcelona">Barcelona</option>
	// 		<option value="Madrid">Madrid</option>
	// 		<option value="Milano">Milano</option>
	// 		<option value="Athens">Athens</option>
	// 	</select>
	// </form>;

	async function fetchDataSearch() {
		const response = await fetch(
			`https://api.skypicker.com/flights?fly_from=${origin}&fly_to=${destination}&partner=picky&limit=20`
		);
		const data = await response.json();
		try{
		setSearchResults(data && data.data);
		console.log(data.data);
		setIsLoading(false);
		} catch (err) {console.error(err)};
	}

	useEffect(() => {
		fetchDataSearch();
	}, []);

	function filter() {
		fetchDataSearch();
	}

	return (
		<main className="justify-center align-center p-5 bg-blue-50">
			<h1 className="text-5xl col-span-3 text-center py-5 text-blue-500">All Flights</h1>
			{/* origin form */}
			<section className="flex justify-center items-center ">
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
				{/* Search with filter */}
				<button className="border bg-green-300  p-1" onClick={filter}>
					Filter
				</button>
			</section>
			{/* search results */}

			

			{isLoading ? (<h1>Loading...</h1>) 
			: (
				 searchResults.length === 0 ? (<h2>No results</h2>) : (<Flight searchResults={searchResults}/> )
			)}
		</main>
	);
}

export default Flights;

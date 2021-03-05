import React, { useEffect, useState } from "react";
import Flight from "../Components/Flight";
import Filter from '../Components/Filter';

function Flights() {
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [origin, setOrigin] = useState("PRG");
	const [destination, setDestination] = useState("VLC");
	const [number, setNumber] = useState(5);
	const [directFlight, setDirectFlight] = useState("All flights");

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

	useEffect(() => {
		fetchDataSearch();
	}, []);

	function fiveMore() { 
		setNumber(number + 5); 
		console.log(number);
	}

	
	return (
		<main className="justify-center align-center p-5 ">
			<h1 className="text-5xl col-span-3 text-center py-5 text-blue-500">All Flights</h1>

		<Filter fetchDataSearch={fetchDataSearch}/>
		
		{/* search results */}

		{isLoading ? (
			<h1>Loading...</h1>
		) : searchResults.length === 0 ? (
			<h2>No results</h2>
		) : (
			<Flight searchResults={searchResults} />
		)}

		<form>
			<button onClick={fiveMore}>5 more results</button>
		</form>

</main>

				
	);
}

export default Flights;

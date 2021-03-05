import React, { useEffect, useState } from "react";
import Flight from "../Components/Flight";

function Index() {
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	async function fetchDataSearch() {
		const response = await fetch(
			`https://api.skypicker.com/flights?fly_from=PRG&fly_to=VLC&partner=picky&limit=5&sort=price&asc=1`
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

	return (
		<div>
			{" "}
			{isLoading ? (
				<h1>Loading...</h1>
			) : searchResults.length === 0 ? (
				<h2>No results</h2>
			) : (
				<Flight searchResults={searchResults} />
			)}
		</div>
	);
}

export default Index;

import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

function Flights() {
	const [searchResults, setSearchResults] = useState([]);
	// const [flights, setFlights] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	// DateTime.fromMillis( * 1000).toFormat("hh:mm");

	async function fetchDataSearch() {
		const response = await fetch(
			`https://api.skypicker.com/flights?fly_from=PRG&fly_to=VLC&partner=picky&limit=20`
		);
		const data = await response.json();
		setSearchResults(data && data.data);
		console.log(data.data);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchDataSearch();
	}, []);

	return (
		<main className="justify-center align-center p-5 bg-blue-50">
			<h1 className="text-5xl col-span-3 text-center py-5 text-blue-500">All Flights</h1>

			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<section className="cards grid grid-cols-2">
					{searchResults.map((item, key) => (
						<div key={key} className="border py-2 flex justify-center items-center m-2 bg-white">
							<div className="flex justify-around px-5 grid grid-rows-2 grid-cols-2">
								<p className=" px-5 text-2xl">From: {item.cityFrom}</p>
								<p className=" px-5 text-2xl">To: {item.cityTo}</p>

								<p className=" px-5">
									Departure time: {DateTime.fromSeconds(item.dTime).toFormat("hh:mm MM-dd ")}
								</p>
								<p className=" px-5">
									Arrival time: {DateTime.fromSeconds(item.aTime).toFormat("hh:mm MM-dd ")}
								</p>
								<p>Flight duration: {item.fly_duration}</p>
								<p>Price: {item.conversion.EUR} EUR </p>
							</div>
						</div>
					))}
				</section>
			)}
		</main>
	);
}

export default Flights;

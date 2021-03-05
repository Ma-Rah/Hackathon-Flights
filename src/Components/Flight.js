import React from "react";
import Flights from "../Pages/Flights";
import { DateTime } from "luxon";

function Flight(props) {
	console.log(props);

	return (
		<section className="cards grid grid-cols-2">
			{props.searchResults.map((item, key) => (
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
						{item.pnr_count > 1 ? (<p>transfers: {item.pnr_count-1}</p>) : (<p>Direct</p>)}  
						<p>Flight Number: {item.route[0].airline}{item.route[0].operating_flight_no}</p>
					</div>
				</div>
			))}
		</section>
	);
}

export default Flight;

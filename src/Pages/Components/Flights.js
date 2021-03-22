import { DateTime } from "luxon";

function Flights(props) {
	const { flights, sorting } = props.flightProps;

	return (
		<div className="flex flex-col justify-center items-center">
			{flights.slice(0,5).map((r, i) => (
				<div
					key={i}
					value={i}
					className="bg-white m-1 px-5 py-2 border w-10/12 md:w-3/4  cursor-pointer transform hover:scale-110 hover:bg-blue-50 duration-100 text-xs sm:text-lg"
				>
					<div className="flex justify-between">
						<span>From: {r.cityFrom}</span>
						<span>
							To: {r.cityTo} - {r.countryTo.name}
						</span>
					</div>
					<div className="flex justify-between">
						<span>Departure: {DateTime.fromSeconds(r.dTime).toFormat("hh:mm MM-dd ")}</span>
						<span>Arrival: {DateTime.fromSeconds(r.aTime).toFormat("hh:mm MM-dd ")}</span>
					</div>

					<div className="flex justify-between">
						<span>
							{" "}
							Flight Duration:
							{i === 0 && sorting === "duration" ? (
								<span className="text-green-600"> {r.fly_duration}</span>
							) : (
								<span className="text-red-600"> {r.fly_duration}</span>
							)}
						</span>

						<span>
							Price: €
							{i === 0 && sorting === "price" ? (
								<span className="text-green-600">{r.conversion.EUR}</span>
							) : (
								<span className="text-red-600">{r.conversion.EUR}</span>
							)}
						</span>
					</div>
					{i === 0 && sorting === "quality" ? (
						<span className="text-green-600 text-2xl">Best Value</span>
					) : null}
					<div className="flex justify-center">
						<a href={r.deep_link} target="_blank" rel="noreferrer">
							<div className="border p-1 mx-1 cursor-pointer transform hover:scale-110 hover:bg-green-200 duration-100 ">
								Book this flight
							</div>
						</a>
					</div>
				</div>
			))}
		</div>
	);
}

export default Flights;

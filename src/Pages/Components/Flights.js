import { DateTime } from "luxon";

function Flights(props) {
	const { flights, sorting } = props;

	return (
		<div className="mt-1 flex flex-col justify-center items-center">
			{flights.slice(0, 5).map((r, i) => (
				<div
					key={i}
					value={i}
					className="bg-white my-1 p-1 border w-full cursor-pointer transform hover:border-green-700 duration-100 text-xs sm:text-lg leading-relaxed"
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
					<div className="flex justify-between">
						{r.pnr_count > 1 ? (
							<span>Transfers: {r.pnr_count - 1}</span>
						) : (
							<span className="text-green-600">Direct flight</span>
						)}
						<img
							src={r.airlines && `https://images.kiwi.com/airlines/64/${r.airlines[0]}.png`}
							alt="airline"
							className="h-5 w-5 md:h-10 md:w-10 "
						/>
					</div>
					{i === 0 && sorting === "quality" ? (
						<div className="flex justify-center">
							<span className="text-green-600 text-center">Recommended</span>
						</div>
					) : null}
					<a href={r.deep_link} target="_blank" rel="noreferrer">
						<button className="border p-1 cursor-pointer transform hover:scale-105 hover:bg-green-200 duration-100">
							Book this flight
						</button>
					</a>
				</div>
			))}
		</div>
	);
}

export default Flights;

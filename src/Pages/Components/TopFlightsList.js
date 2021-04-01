import React, { useState } from "react";
import Loader from "react-loader-spinner";

function TopFlightsList(props) {
	const { destination, searchResults, setDestination } = props;

	const [pageIndex, setPageIndex] = useState([0, 10]);

	// pagination section
	function nextPage() {
		if (pageIndex[1] <= searchResults.length - 10) {
			setPageIndex([pageIndex[0] + 10, pageIndex[1] + 10]);
		} else {
			return;
		}
	}

	function previousPage() {
		if (pageIndex[0] >= 10) {
			setPageIndex([pageIndex[0] - 10, pageIndex[1] - 10]);
		} else {
			return;
		}
	}

	return (
		<div className="flex justify-center items-center flex-col flex-nowrap w-full ">
			<div className="flex flex-col justify-center items-center bg-white w-11/12 sm:w-1/2 my-1">
				<h1 className="text-xl p-1 text-black  ">Top Destinations From Prague</h1>
				{destination ? (
					<div className="flex justify-center bg-white py-5">
						<Loader type="Oval" color="#00BFFF" height={40} width={40} />
					</div>
				) : (
					<h2 className="text-1xl p-1 text-black ">Select a destination</h2>
				)}
			</div>

			<div className="flex flex-col justify-center items-center w-full ">
				{searchResults.slice(pageIndex[0], pageIndex[1]).map((r, i) => (
					<div
						key={i}
						value={i}
						className="bg-white my-1 p-2 border w-11/12 sm:w-1/2 cursor-pointer transform hover:scale-105 hover:bg-blue-50 duration-100"
						onClick={() => setDestination(r.code)}
					>
						{r.name} - {r.country.name}
					</div>
				))}
			</div>
			<div className="flex justify-center mt-2">
				<div
					className="border p-1 mx-1 cursor-pointer transform hover:scale-105 hover:bg-green-200 duration-100 bg-white"
					onClick={previousPage}
				>
					Previous 10 Results
				</div>
				<div
					className="border p-1 mx-1 cursor-pointer transform hover:scale-105 hover:bg-green-200 duration-100 bg-white"
					onClick={nextPage}
				>
					Next 10 Results
				</div>
			</div>
		</div>
	);
}

export default TopFlightsList;

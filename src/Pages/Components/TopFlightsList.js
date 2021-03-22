import React, { useState } from "react";

function TopFlightsList(props) {
	const { destination, searchResults, setDestination } = props.listProps;

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
		<>
			<div className="flex flex-col justify-center items-center bg-white w-full rounded">
				<h1 className="text-2xl p-1 text-black  ">Top Destinations From Prague</h1>
				{destination ? (
					<h2 className="text-1xl p-1 text-green-400 ">Searching for flights...</h2>
				) : (
					<h2 className="text-1xl p-1 text-black ">Select a destination</h2>
				)}
			</div>
			<div className="flex justify-center flex-col flex-nowrap">
				<div className="flex flex-col justify-center items-center">
					{searchResults.slice(pageIndex[0], pageIndex[1]).map((r, i) => (
						<div
							key={i}
							value={i}
							className="bg-white m-1 p-2 border w-10/12 md:w-1/2 cursor-pointer transform hover:scale-110 hover:bg-blue-50 duration-100"
							onClick={() => setDestination(r.code)}
						>
							{r.name} - {r.country.name}
						</div>
					))}
				</div>
				<div className="flex justify-center mt-2">
					<div
						className="border p-1 mx-1 cursor-pointer transform hover:scale-110 hover:bg-green-200 duration-100 bg-white"
						onClick={previousPage}
					>
						Previous 10 Results
					</div>
					<div
						className="border p-1 mx-1 cursor-pointer transform hover:scale-110 hover:bg-green-200 duration-100 bg-white"
						onClick={nextPage}
					>
						Next 10 Results
					</div>
				</div>
			</div>
		</>
	);
}

export default TopFlightsList;

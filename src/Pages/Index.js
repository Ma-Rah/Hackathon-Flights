import React, { useEffect, useState } from "react";
import Flight from "../Components/Flight";
import ReactPaginate from "react-paginate";

function Index() {
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// pagination

	const [currentPage, setCurrentPage] = useState(0);
	const PER_PAGE = 5;
	const offset = currentPage * PER_PAGE;
	let currentPageData = searchResults.slice(offset, offset + PER_PAGE);
	const pageCount = Math.ceil(searchResults.length / PER_PAGE);
	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
		console.log(currentPageData);
	}

	async function fetchDataSearch() {
		const response = await fetch(
			`https://api.skypicker.com/flights?fly_from=PRG&fly_to=VLC&partner=picky&limit=50&sort=date&asc=1`
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
				<Flight searchResults={currentPageData} />
			)}
			<ReactPaginate
				previousLabel={"← Previous"}
				nextLabel={"Next →"}
				pageCount={pageCount}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				previousLinkClassName={"pagination__link"}
				nextLinkClassName={"pagination__link"}
				disabledClassName={"pagination__link--disabled"}
				activeClassName={"pagination__link--active"}
			/>
		</div>
	);
}

export default Index;

function Filter(props) {
	const { sorting, setSorting, isLoading, setIsLoading, setDirectFlight, directFlight } = props;
	return (
		<div className="flex flex-col justify-center items-center my-1">
			<div className="flex flex-col justify-center items-center bg-white w-full">
				<span className=" text-xl ">Sort by:</span>
				<form className="text-gray-800 text-lg flex bg-white p-2 ">
					{" "}
					<span className="px-2">
						<select
							onChange={(e) => {
								setSorting(e.target.value);
								setIsLoading(true);
							}}
							defaultValue={sorting}
							className=" w-full border bg-white "
						>
							<option value="quality">Recommended</option>
							<option value="duration">Duration</option>
							<option value="price">Price</option>
						</select>
					</span>
					<span className="px-2">
						<input
							type="checkbox"
							defaultChecked={directFlight}
							onChange={() => setDirectFlight(!directFlight)}
						/>{" "}
						Direct
					</span>
				</form>
				{isLoading ? <h2 className="text-2xl p-1 text-green-600 ">Loading results...</h2> : null}
			</div>
		</div>
	);
}

export default Filter;

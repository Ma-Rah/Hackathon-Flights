import Loader from "react-loader-spinner";

function Filter(props) {
	const { sorting, setSorting, isLoading, setIsLoading, setDirectFlight, directFlight } = props;
	return (
		<div className="flex flex-col justify-center items-center ">
			<div className="flex flex-col justify-center items-center bg-white w-full ">
				<span className=" text-lg ">Sort by:</span>
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
				{isLoading ? (
					<div className="flex justify-center bg-white py-5">
						<Loader type="Oval" color="#00BFFF" height={40} width={40} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Filter;

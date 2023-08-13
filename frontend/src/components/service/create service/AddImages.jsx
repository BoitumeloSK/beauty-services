export default function AddImages({ urls, changeFunction }) {
	return (
		<div className="center">
			<div>
				{urls.map((x, i) => {
					return <img key={i} src={x} alt="" />;
				})}
			</div>
			<br></br>
			<div className="file-label">
				<input
					name="images"
					type="file"
					accept="image/*"
					className="file"
					onChange={changeFunction}
				/>
				<label htmlFor="images">Add Image</label>
			</div>
		</div>
	);
}

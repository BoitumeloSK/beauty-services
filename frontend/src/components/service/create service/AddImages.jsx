export default function AddImages({ urls, changeFunction }) {
	return (
		<div className="center">
			<p style={{ textAlign: "center" }}>
				<i>
					Images will appear below once fully loaded. it might take a while so
					you only need to slick "upload/open" ONCE. Please upload a maximum of
					3 images.
				</i>
			</p>
			<div
				style={{ border: "solid #9f9f9f 1px", width: "100%", height: "30vh" }}
			>
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
				<label htmlFor="images">ADD IMAGE</label>
			</div>
		</div>
	);
}

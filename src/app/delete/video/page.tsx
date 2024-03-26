import { deleteVideo } from "@/app/utils/delete/delete-video";
/// imports

const DeleteSingleVideo = () => {
	return (
		<>
			<h2> delete a Video</h2>

			<form className="form" action={deleteVideo}>
				<div className="flex gap-3 *:w-full">
					{/* start branch  */}
					<div className="field-container">
						<label htmlFor="branch">branch</label>
						<select name="branch" id="branch">
							<option hidden>branch</option>
							<option value="mip">mip</option>
							<option value="bcg">bcg</option>
							<option value="gegm">gegm</option>
						</select>
						<p className="error branch"></p>
					</div>
					{/* end branch  */}

					{/* start semester  */}
					<div className="field-container">
						<label htmlFor="semester">semester</label>
						<select name="semester" id="semester">
							<option hidden>semester</option>
							<option value="s1">s1</option>
							<option value="s2">s2</option>
							<option value="s3">s3</option>
							<option value="s4">s4</option>
						</select>
						<p className="error semester"></p>
					</div>
					{/* end semester  */}
				</div>

				<div className="flex gap-3 *:w-full">
					{/* start module  */}
					<div className="field-container">
						<label htmlFor="module">module</label>
						<input
							type="text"
							name="module"
							id="module"
							placeholder="ex: algebre 2"
						/>
						<p className="error module"></p>
					</div>
					{/* end module  */}

					{/* start session  */}
					<div className="field-container">
						<label htmlFor="session">session</label>
						<select name="session" id="session">
							<option hidden>session</option>
							<option value="cour">cour</option>
							<option value="td">td</option>
						</select>
						<p className="error session"></p>
					</div>
					{/* end session  */}
				</div>

				{/* start title  */}
				<div className="field-container">
					<label htmlFor="title">title</label>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="document title"
					/>
					<p className="error title"></p>
				</div>
				{/* end title  */}

				<button type="submit">submit</button>
			</form>
		</>
	);
};

export default DeleteSingleVideo;

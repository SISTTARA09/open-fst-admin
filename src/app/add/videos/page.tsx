"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface VideosModule {
	branch: "branch" | "mip" | "bcg" | "gegm";
	semester: "semester" | "s1" | "s2" | "s3" | "s4";
	session: "session" | "cour" | "td";
	module: string;
	owner: string;
}

const AddVideosModule = () => {
	const [resMsg, setResMsg] = useState<string>("");
	const formRef = useRef<HTMLFormElement | null>(null);
	const { register, formState, handleSubmit } = useForm<VideosModule>();
	const { errors } = formState;
	/// states

	async function onSubmit() {
		const form: any = formRef.current;
		const formData = new FormData(form);
		const response = await fetch("/add/videos/api", {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		setResMsg(data.message);
		return;
	}

	return (
		<>
			<h2> Add a doc</h2>

			<form className="form" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-3 *:w-full">
					{/* start branch  */}
					<div className="field-container">
						<label htmlFor="branch">branch</label>
						<select
							{...register("branch", {
								validate: {
									blackList: function (fieldValue) {
										return fieldValue !== "branch" || "choose a branch!!";
									},
								},
							})}
							id="branch"
						>
							<option hidden>branch</option>
							<option value="mip">mip</option>
							<option value="bcg">bcg</option>
							<option value="gegm">gegm</option>
						</select>
						<p className="error">
							{errors.branch && String(errors.branch.message)}{" "}
						</p>
					</div>
					{/* end branch  */}

					{/* start semester  */}
					<div className="field-container">
						<label htmlFor="semester">semester</label>
						<select
							{...register("semester", {
								validate: {
									blackList: function (fieldValue) {
										return fieldValue !== "semester" || "choose a semester";
									},
								},
							})}
							id="semester"
							required
						>
							<option hidden>semester</option>
							<option value="s1">s1</option>
							<option value="s2">s2</option>
							<option value="s3">s3</option>
							<option value="s4">s4</option>
						</select>
						<p className="error semester">
							{errors.semester && String(errors.semester.message)}
						</p>
					</div>
					{/* end semester  */}
				</div>

				<div className="flex gap-3 *:w-full">
					{/* start module  */}
					<div className="field-container">
						<label htmlFor="module">module</label>
						<input
							type="text"
							{...register("module", {
								required: {
									value: true,
									message: "Enter the module!!",
								},
							})}
							id="module"
							placeholder="ex: algebre 2"
						/>
						<p className="error">
							{errors.module && String(errors.module.message)}
						</p>
					</div>
					{/* end module  */}

					{/* start session  */}
					<div className="field-container">
						<label htmlFor="session">session</label>
						<select
							{...register("session", {
								validate: {
									blackList: function (fieldValue) {
										return fieldValue !== "session" || "choose a session!!";
									},
								},
							})}
							id="session"
						>
							<option hidden>session</option>
							<option value="cour">cour</option>
							<option value="td">td</option>
						</select>
						<p className="error"> {errors.session?.message} </p>
					</div>
					{/* end session  */}
				</div>

				{/* start owner */}
				<div className="field-container">
					<label htmlFor="owner">owner (optional)</label>
					<input
						type="text"
						{...register("owner", {
							required: {
								value: true,
								message: "Enter the owner!!",
							},
						})}
						id="owner"
						multiple={false}
					/>
					<p className="error">
						{errors.owner && String(errors.owner.message)}
					</p>
				</div>
				{/* end owner */}

				<button type="submit">submit</button>
			</form>
			<div className="result"> {resMsg} </div>
		</>
	);
};

export default AddVideosModule;

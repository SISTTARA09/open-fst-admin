"use client";
import { useForm } from "react-hook-form";
/// imports

export default function SignInPage() {
	const { register, formState, handleSubmit } = useForm();
	const { errors } = formState;
	function onClick() {
		console.log("hello");
	}

	return (
		<>
			<form className="form">
				<h3 className="text-2xl">Sign In</h3>

				{/* start email  */}
				<div className=" field-container">
					<label htmlFor="email">Email</label>
					<input
						{...register("email", {
							required: {
								value: true,
								message: "Enter you email",
							},
						})}
						id="email"
						placeholder="m@example.com"
						type="email"
					/>
					<p className="error">
						{errors.email && String(errors?.email?.message)}{" "}
					</p>
				</div>
				{/* end email  */}

				{/* start password  */}
				<div className=" field-container">
					<label htmlFor="password">Password</label>
					<input
						{...register("password", {
							required: {
								value: true,
								message: "Enter you password",
							},
						})}
						id="password"
						type="password"
					/>
					<p className=" error">
						{" "}
						{errors.password && String(errors?.password?.message)}{" "}
					</p>
				</div>
				{/* end password  */}

				<button
					type="submit"
					onClick={handleSubmit(onClick)}
					className="w-full"
				>
					Sign in
				</button>
			</form>
			<div></div>
		</>
	);
}

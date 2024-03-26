import mongoose from "mongoose";
import Link from "next/link";

const page = () => {
	return (
		<div>
			<h1>Hello </h1>
			<Link href="/add/videos">videos</Link>
		</div>
	);
};

export default page;

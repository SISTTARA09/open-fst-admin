interface VideoFormFields {
	branch: "branch" | "mip" | "bcg" | "gegm";
	semester: "semester" | "s1" | "s2" | "s3" | "s4";
	module: string;
	session: "session" | "cour" | "td";
	title: string;
	path: string;
}

interface DocFormFields {
	branch: "branch" | "mip" | "bcg" | "gegm";
	semester: "semester" | "s1" | "s2" | "s3" | "s4";
	module: string;
	session: "session" | "cour" | "td";
	title: string;
	doc: File;
	type: "img" | "pdf";
}
export { VideoFormFields, DocFormFields };

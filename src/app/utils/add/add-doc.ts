import { v2 as cloudinary } from "cloudinary";
import { CourDoc, TDDoc } from "../../models/Doc";
/// imports

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
//
async function uploadFile(data: FormData) {
	"use server";
	try {
		const file: File | null = data.get("doc") as unknown as File;

		if (!file) throw new Error("file is not exist!!");

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const formValues = Object.fromEntries(data);

		cloudinary.uploader
			.upload_stream({ resource_type: "auto" }, async (error, result) => {
				if (error) throw new Error("Error in uploading to cloudinary!!");
				const docURL = result?.secure_url; // img url

				// upload to mongo db
				try {
					switch (formValues.session) {
						case "cour":
							await CourDoc.updateOne(
								{
									module: String(formValues.module),
									semester: String(formValues.semester),
								},
								{
									$push: {
										docs: {
											title: String(formValues.title),
											type: String(formValues.type),
											doc: String(docURL),
										},
									},
								}
							);
							break;

						case "td":
							await TDDoc.updateOne(
								{
									module: String(formValues.module),
									semester: String(formValues.semester),
								},
								{
									$push: {
										docs: {
											title: formValues.title,
											type: formValues.type,
											doc: docURL,
										},
									},
								}
							);
							break;
						default:
							throw new Error("this session is not supported!!");
					}
					console.log("file is uploaded to db");
				} catch (error: any) {
					console.log("error in uploading to db");
					console.log(error.message);
				}
			})
			.end(buffer);
	} catch (error) {
		console.log(error);
	}
}
///

export { uploadFile };

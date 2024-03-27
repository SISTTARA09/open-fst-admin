import { uploadToDb } from "@/app/utils/add/add-doc";
import { v2 as cloudinary } from "cloudinary";
import { type NextRequest, NextResponse } from "next/server";
/// imports

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
//
export async function POST(req: NextRequest) {
	const data = await req.formData();
	try {
		const file: File = data.get("doc") as unknown as File;

		if (!file) throw new Error("file is not exist!!");

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const formValues = Object.fromEntries(data);
		cloudinary.uploader
			.upload_stream({ resource_type: "auto" }, async (error, result) => {
				if (error) throw new Error("Error in uploading to cloudinary!!");
				const docURL = result?.secure_url; // img url

				await uploadToDb(formValues, docURL);
			})
			.end(buffer);
		return NextResponse.json({
			message: "successfully uploaded:)",
			success: true,
		});
	} catch (error) {
		return NextResponse.json({
			message: " uploading is failed:)",
			success: false,
		});
	}
}

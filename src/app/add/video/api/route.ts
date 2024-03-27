import { CourPlayList, TDPlayList } from "@/app/models/PlayList";
import { UpdateWriteOpResult } from "mongoose";
import { type NextRequest, NextResponse } from "next/server";
/// imports

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const formValues = Object.fromEntries(formData);

	let updateResponse: UpdateWriteOpResult;
	// upload to mongo db
	try {
		switch (formValues.session) {
			case "cour":
				updateResponse = await CourPlayList.updateOne(
					{
						module: String(formValues.module),
						semester: String(formValues.semester),
					},
					{
						$push: {
							videos: {
								title: formValues.title,
								path: formValues.path,
							},
						},
					}
				);
				if (!updateResponse.matchedCount)
					throw new Error("palylist is not found!!");
				if (!updateResponse.modifiedCount)
					throw new Error("video is failed to uploaded!!");
				break;

			case "td":
				updateResponse = await TDPlayList.updateOne(
					{
						module: String(formValues.module),
						semester: String(formValues.semester),
					},
					{
						$push: {
							videos: {
								title: formValues.title,
								path: formValues.path,
							},
						},
					}
				);
				if (!updateResponse.matchedCount)
					throw new Error("palylist is not found!!");
				if (!updateResponse.modifiedCount)
					throw new Error("video is failed to uploaded!!");
				break;

			default:
				throw new Error("this session is not supported!!");
		}
		return NextResponse.json({
			message: "video uploaded successfully:)",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({
			message: error.message,
			success: false,
		});
	}
}
///

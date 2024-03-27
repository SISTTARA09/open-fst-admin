/// imports

import { CourPlayList, TDPlayList } from "@/app/models/PlayList";
import { UpdateWriteOpResult } from "mongoose";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	const data = await req.formData();
	const formValues = Object.fromEntries(data);
	let updateResponse: UpdateWriteOpResult;

	// delete from mongo db
	try {
		switch (formValues.session) {
			case "cour":
				updateResponse = await CourPlayList.updateOne(
					{
						module: String(formValues.module),
						semester: String(formValues.semester),
					},
					{
						$pull: {
							videos: {
								title: formValues.title,
							},
						},
					}
				);
				if (!updateResponse.matchedCount)
					throw new Error("video is not found!!");
				if (!updateResponse.modifiedCount)
					throw new Error("video is failed to delete!!");
				break;

			case "td":
				updateResponse = await TDPlayList.updateOne(
					{
						module: String(formValues.module),
						semester: String(formValues.semester),
					},
					{
						$pull: {
							videos: {
								title: formValues.title,
							},
						},
					}
				);
				if (!updateResponse.matchedCount)
					throw new Error("video is not found!!");
				if (!updateResponse.modifiedCount)
					throw new Error("video is failed to delete!!");
				break;

			default:
				throw new Error("this session is not supported!!");
		}
		return NextResponse.json({
			message: "video is deleted successfully:)",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
///

/// imports

import { CourDoc, TDDoc } from "@/app/models/Doc";
import { UpdateWriteOpResult } from "mongoose";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	const data = await req.formData();
	const formValues = Object.fromEntries(data);

	let updateResponse: UpdateWriteOpResult;

	// delete form db
	try {
		switch (formValues.session) {
			case "cour":
				updateResponse = await CourDoc.updateOne(
					{
						module: String(formValues.module),
						semester: String(formValues.semester),
					},
					{
						$pull: {
							docs: {
								title: String(formValues.title),
							},
						},
					}
				);
				if (!updateResponse.matchedCount) throw new Error("doc is not found!!");
				if (!updateResponse.modifiedCount)
					throw new Error("doc is failed to delete!!");
				break;

			case "td":
				updateResponse = await TDDoc.updateOne(
					{
						module: String(formValues.module),
						semester: String(formValues.semester),
					},
					{
						$pull: {
							docs: {
								title: formValues.title,
							},
						},
					}
				);
				if (!updateResponse.matchedCount) throw new Error("doc is not found!!");
				if (!updateResponse.modifiedCount)
					throw new Error("doc is failed to delete!!");
				break;
			default:
				throw new Error("this session is not supported!!");
		}
		return NextResponse.json({
			message: "doc successfully deleted:)",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
///

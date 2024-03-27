import { CourPlayList, TDPlayList } from "@/app/models/PlayList";
import { NextResponse, type NextRequest } from "next/server";

// document
export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const formValues = Object.fromEntries(formData);

	try {
		switch (formValues.session) {
			case "cour":
				await CourPlayList.create({ ...formValues });
				break;
			case "td":
				await TDPlayList.create({ ...formValues });
				break;
			default:
				throw new Error("this session is not supported!!");
		}
		return NextResponse.json({
			message: "video module is added successfully:)",
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

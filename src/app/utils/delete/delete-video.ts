import { CourPlayList, TDPlayList } from "../../models/PlayList";
/// imports

async function deleteVideo(data: FormData) {
	"use server";
	try {
		const formValues = Object.fromEntries(data);

		// upload to mongo db
		try {
			switch (formValues.session) {
				case "cour":
					await CourPlayList.updateOne(
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
					break;

				case "td":
					await TDPlayList.updateOne(
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
					break;

				default:
					throw new Error("this session is not supported!!");
			}
			console.log("video is deleted successfully:)");
		} catch (error: any) {
			console.log("error in deleting video");
			console.log(error.message);
		}
	} catch (error) {
		console.log(error);
	}
}
///

export { deleteVideo };

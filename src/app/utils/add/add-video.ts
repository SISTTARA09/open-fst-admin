import { CourPlayList, TDPlayList } from "../../models/PlayList";
/// imports

async function uploadVideo(data: FormData) {
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
							$push: {
								videos: {
									title: formValues.title,
									path: formValues.path,
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
							$push: {
								videos: {
									title: formValues.title,
									path: formValues.path,
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
	} catch (error) {
		console.log(error);
	}
}
///

export { uploadVideo };

// async function postSingleVideoToPlaylist(
// 	req: express.Request,
// 	res: express.Response
// ) {
// 	const videoInfo = req.body;

// 	try {
// 		switch (videoInfo.session) {
// 			case "cour":
// 				await CourPlayList.updateOne(
// 					{ module: videoInfo.module, semester: videoInfo.semester },
// 					{ $push: { videos: videoInfo.video } }
// 				);
// 				break;

// 			case "td":
// 				await TDPlayList.updateOne(
// 					{ module: videoInfo.module, semester: videoInfo.semester },
// 					{ $push: { videos: videoInfo.video } }
// 				);
// 				break;
// 			default:
// 				throw new Error("this session is not supported!!");
// 		}
// 		res.json({ message: "document is added successfully:)", success: true });
// 	} catch (error: any) {
// 		res.status(400).json({ message: error.message, success: false });
// 	}
// }

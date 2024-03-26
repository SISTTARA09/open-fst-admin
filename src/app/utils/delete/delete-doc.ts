import { CourDoc, TDDoc } from "../../models/Doc";
/// imports

async function deleteDoc(data: FormData) {
	"use server";
	try {
		const formValues = Object.fromEntries(data);

		// delete form db
		try {
			switch (formValues.session) {
				case "cour":
					await CourDoc.updateOne(
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
					break;

				case "td":
					await TDDoc.updateOne(
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
					break;
				default:
					throw new Error("this session is not supported!!");
			}
			console.log("file is delete from db");
		} catch (error: any) {
			console.log("error in deleting from db");
			console.log(error.message);
		}
	} catch (error) {
		console.log(error);
	}
}
///

export { deleteDoc };

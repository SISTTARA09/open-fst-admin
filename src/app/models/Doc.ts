import mongoose from "mongoose";
/// imports

// schema
const docSchema = new mongoose.Schema({
	branch: {
		type: String,
		required: [true, "wich branch!!"],
	},
	semester: {
		type: String,
		required: [true, "enter the semester!!"],
	},
	module: {
		type: String,
		required: [true, "enter the module!!"],
	},
	docs: {
		type: [
			{
				title: { type: String },
				doc: { type: String },
				type: { type: String },
			},
		],
		default: [],
	},

	prof: String,
});
///

// models
const CourDoc =
	mongoose.models["CourDoc"] || mongoose.model("CourDoc", docSchema);
const TDDoc = mongoose.models["TDDoc"] || mongoose.model("TDDoc", docSchema);
///

export { CourDoc, TDDoc };

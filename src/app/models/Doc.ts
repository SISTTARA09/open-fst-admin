import mongoose from "mongoose";
/// imports

// schema
const docSchema = new mongoose.Schema({
	isNewDoc: {
		type: Boolean,
		required: [true, "is it new !!"],
	},
	branches: {
		type: Array(String),
		required: [true, "wich branches!!"],
	},
	semester: {
		type: String,
		required: [true, "enter the semester!!"],
	},
	module: {
		type: String,
		required: [true, "enter the module!!"],
	},
	docs: [
		{
			title: { type: String },
			doc: { type: String },
			type: { type: String },
		},
	],

	prof: String,
});
///

// models
const CourDoc = mongoose.model("CourDoc", docSchema);
const TDDoc = mongoose.model("TDDoc", docSchema);
///

export { CourDoc, TDDoc };

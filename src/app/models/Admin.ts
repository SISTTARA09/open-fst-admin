import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "enter admin name"],
	},
	email: {
		type: String,
		required: [true, "Enter admin email!!"],
	},
	password: {
		type: String,
		required: [true, "Enter your password!!"],
		minlength: [8, "Enter a stronger password!!"],
	},
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;

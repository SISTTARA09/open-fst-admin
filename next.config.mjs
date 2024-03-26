/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		MONGODB_URI: "mongodb://localhost:27017/sample-open-fst",
		CLOUDINARY_NAME: "dgmichvn8",
		CLOUDINARY_API_KEY: "312291871695631",
		CLOUDINARY_API_SECRET: "kLaJytlUKD15DOJpQt1-BYfMOF8",
	},
};

export default nextConfig;

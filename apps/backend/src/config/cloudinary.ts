import { v2 as cloudinary } from "cloudinary";

console.log("Cloudinary config:");
console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ? "OK" : "MISSING");
console.log("API_KEY:", process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING");
console.log("API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export default cloudinary;
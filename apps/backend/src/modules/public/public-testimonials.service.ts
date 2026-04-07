import { PrismaClient } from "@prisma/client";
import cloudinary from "../../config/cloudinary";
import { extractYoutubeId } from "../../shared/utils/youtube";
import { AppError } from "../../shared/utils/app-error";
import type { CreatePublicTestimonioInput } from "./public-testimonials.schema";

const prisma = new PrismaClient();

function bufferToBase64(buffer: Buffer) {
    return `data:application/octet-stream;base64,${buffer.toString("base64")}`;
}

export class PublicTestimoniosService {
    async create(
        data: CreatePublicTestimonioInput,
        file?: Express.Multer.File
    ) {

        console.log("=== SERVICE CREATE ===");
        console.log("Data.type:", data.type);
        console.log("File:", !!file, file?.originalname, file?.mimetype, file?.size);

        let imageUrl: string | null = null;
        let videoUrl: string | null = null;
        let youtubeId: string | null = null;

        if (data.type === "IMAGE") {
            if (!file) {
                throw new AppError(400, "IMAGE_REQUIRED", "Se requiere una imagen");
            }

            console.log("Uploading image to Cloudinary...");
            console.log("File buffer length:", file.buffer.length);
            console.log("File mimetype:", file.mimetype);

            const uploaded = await cloudinary.uploader.upload(
                bufferToBase64(file.buffer),
                {
                    folder: "testimonial-cms/images",
                    resource_type: "image",
                }
            );

            console.log("Cloudinary response:", uploaded);
            imageUrl = uploaded.secure_url;
        }

        if (data.type === "VIDEO") {
            if (file) {
                const uploaded = await cloudinary.uploader.upload(
                    bufferToBase64(file.buffer),
                    {
                        folder: "testimonial-cms/videos",
                        resource_type: "video",
                    }
                );

                videoUrl = uploaded.secure_url;
            } else if (data.youtubeUrl) {
                const id = extractYoutubeId(data.youtubeUrl);
                if (!id) {
                    throw new AppError(400, "INVALID_YOUTUBE_URL", "URL de YouTube inválida");
                }
                youtubeId = id;
            } else {
                throw new AppError(400, "VIDEO_REQUIRED", "Se requiere video o URL de YouTube");
            }
        }

        const testimonial = await prisma.testimonial.create({
            data: {
                title: data.titulo,
                content: data.contenido,
                authorName: data.autorNombre,
                authorPosition: data.autorPosition ?? "",
                authorEmail: data.autorEmail ?? "",
                authorCompany: data.autorCompany ?? "",
                type: data.type,
                status: "PENDING",
                imageUrl,
                videoUrl,
                youtubeId,
                categoryId: data.categoryId || null,
                createdById: null,
                adminId: null,
            },
        });

        if (data.tagIds?.length) {
            await prisma.testimonialTag.createMany({
                data: data.tagIds.map((tagId) => ({
                    testimonialId: testimonial.id,
                    tagId,
                })),
            });
        }

        return testimonial;
    }
}
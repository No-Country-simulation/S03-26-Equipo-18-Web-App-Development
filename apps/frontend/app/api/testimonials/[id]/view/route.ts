import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



const POST = async (

    request: Request,
    { params }: { params: { id: string } }

) => {

    try {
        const { id } = params;

        // Incrementamos el contador de forma atómica en la DB
        await prisma.testimonial.update({
        where: { id },
        data: {
            views: { increment: 1 },
        },
        });

    return NextResponse.json({ message: "Vista incrementada" });
  } catch (error) {
        console.error("Error al incrementar la vista:", error);
        return NextResponse.json({ error: "Error al incrementar la vista" }, { status: 500 });
    }
}

export default POST
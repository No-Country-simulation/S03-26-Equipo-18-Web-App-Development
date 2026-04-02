import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const POST = async(
    request: Request,
    { params }: { params: { id: string } }
) => {

    try {
    const { id } = params;

    await prisma.testimonial.update({
      where: { id },
      data: {
        clicks: { increment: 1 },
      },
    });
  return NextResponse.json({ message: "Click registrado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al registrar click" }, { status: 500 });
  }
}

export default POST
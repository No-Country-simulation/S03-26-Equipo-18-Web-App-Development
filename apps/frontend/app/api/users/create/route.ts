import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { render } from '@react-email/render';
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";
import bcrypt from "bcryptjs";
import React from "react"; // Necesario para procesar el JSX del email

export async function POST(req: Request) {
  console.log("Clave detectada:", process.env.RESEND_API_KEY ? "SÍ ✅" : "NO ❌");
  try {
    const body = await req.json();
    
    // 1. Extraemos y tipamos los datos
    const username = body.username as string;
    const email = body.email as string;
    const role = body.role as string;
    const password = body.password as string; // La plana: "pass123"
    const adminId = body.adminId as string;
    const organization = body.organization || "EdTech Academy";

    // 2. Validación de usuario existente
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Este correo electrónico ya está registrado." },
        { status: 400 }
      );
    }

    // 3. Hashear la contraseña para la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Crear el usuario en Prisma
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
        adminId,
        organization,
      },
    });

    // 5. Enviar el Email con Resend
    // Usamos formato JSX <WelcomeEmail /> para evitar el error "render is not a function"
    try {

      // 5.1 Transformamos el componente en HTML puro
      const emailHtml = await render(
        React.createElement(WelcomeEmail, {
          username: username,
          email: email,
          role: role,
          organization: organization,
          tempPassword: password, // "pass123"
        })
      );


      await resend.emails.send({
        from: "EdTech Academy <onboarding@resend.dev>",
        to: email,
        subject: "¡Bienvenido! Tus accesos a la plataforma",
        html: emailHtml,
      }), 
      
      console.log(`✅ Email enviado con éxito a: ${email}`);
    } catch (emailError) {
      // Si falla el mail, no detenemos la respuesta porque el usuario ya se creó en la DB
      console.error("❌ Error al enviar el email con Resend:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Usuario creado exitosamente",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("❌ Error en el servidor (API Create User):", error);
    return NextResponse.json(
      { error: "Hubo un error interno al procesar la solicitud." },
      { status: 500 }
    );
  }
}
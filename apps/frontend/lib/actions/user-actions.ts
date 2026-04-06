"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";


{/**CREAR UN NUEVO USUARIO  */}
export async function createUserAction(formData: any, adminInstituto: string) {
  const { username, email, role } = formData;

  // 1. Generamos una contraseña temporal (puedes cambiarla por algo más complejo)
  const temporaryPassword = "Cambiar123!"; 
  const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || "EDITOR",
        instituto: adminInstituto, // <--- Aquí heredamos el instituto del Admin
        active: true,
        apiKey: null,//sólo el admin original posee apiKey
      },
    });

    revalidatePath("/dashboard/users");
    return { success: true, user: newUser, tempPass: temporaryPassword };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "El email ya está registrado." };
    }
    return { error: "Error al crear el usuario." };
  }
}


{/**BORRAR UN USUARIO  */}
export async function deleteUserAction(id: string) {

  try {
    await prisma.user.delete({
      where: { id },
    });

    // Esto obliga a Next.js a refrescar la lista de usuarios automáticamente
    revalidatePath("/dashboard/users"); 
    
    return { success: true };
  } catch (error) {
    return { success: false, error: "No se pudo eliminar el usuario" };
  }
}


{/**ACTUALIZAR USUARIO  */}
export async function updateUserAction(id: string, formData: any) {
  const { username, email, role } = formData;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        role,
      },
    });

    // Refrescamos la ruta para que la tabla muestre los nuevos datos
    revalidatePath("/dashboard/users");

    return { success: true, user: updatedUser };
  } catch (error: any) {
    // Error P2002: El nuevo email ya existe en otro usuario
    if (error.code === "P2002") {
      return { success: false, error: "El email ya está en uso por otro usuario." };
    }
    return { success: false, error: "Error al actualizar el usuario." };
  }
}
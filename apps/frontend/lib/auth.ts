import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters"
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt", // Usamos JSON Web Tokens para manejar la sesión
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Buscamos al usuario por email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) return null;

        // 2. Comparamos la contraseña ingresada con la de la DB
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        // 3. Si todo está bien, devolvemos el usuario
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
          adminId: user.adminId, // <-- IMPORTANTE: Guardamos el jefe
        };
      }
    })
  ],
  callbacks: {
    // Este paso es CRUCIAL: mete los datos del usuario en el Token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.adminId = user.adminId;
      }
      return token;
    },
    // Este paso pasa los datos del Token a la Sesión (lo que lee el Dashboard)
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.adminId = token.adminId as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login", // Nuestra página personalizada de login
  }
};
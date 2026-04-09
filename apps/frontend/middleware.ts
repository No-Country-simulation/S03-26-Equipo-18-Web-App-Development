export { default } from "next-auth/middleware";

export const config = { 
  // Aquí defines qué rutas quieres proteger
  matcher: ["/dashboard/:path*" ] 
};
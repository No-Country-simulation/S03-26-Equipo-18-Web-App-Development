import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ADMIN_NAME = process.env.SEED_ADMIN_NAME || 'Admin Inicial';
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@testimonialcms.local';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'Admin123*';
const ADMIN_API_KEY = process.env.SEED_ADMIN_API_KEY || "admin-api-key-inicial";

async function main() {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const admin = await prisma.user.upsert({

    where: { email: ADMIN_EMAIL },
    update: {
      name: ADMIN_NAME,
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
      organization: null,
      apiKey: ADMIN_API_KEY,
      adminId: null,
    },
    create: {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
      organization: null,
      apiKey: ADMIN_API_KEY,
      adminId: null,
    },
  });

  console.log('✅ Admin seed ejecutado correctamente');
  console.log({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isActive: admin.isActive,
  });
}

main()
  .catch((error) => {
    console.error('❌ Error ejecutando seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
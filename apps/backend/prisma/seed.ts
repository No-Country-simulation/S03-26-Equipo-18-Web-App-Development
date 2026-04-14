import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ADMIN_NAME = process.env.SEED_ADMIN_NAME || 'Admin Inicial';
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@testimonialcms.local';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'Admin123*';
const ADMIN_API_KEY = process.env.SEED_ADMIN_API_KEY || 'admin-api-key-inicial';

const BASE_CATEGORIES = [
  {
    name: 'Producto',
    slug: 'producto',
    description: 'Testimonios relacionados con productos',
    isSystem: true,
  },
  {
    name: 'Evento',
    slug: 'evento',
    description: 'Testimonios relacionados con eventos',
    isSystem: true,
  },
  {
    name: 'Cliente',
    slug: 'cliente',
    description: 'Testimonios relacionados con clientes',
    isSystem: true,
  },
  {
    name: 'Industria',
    slug: 'industria',
    description: 'Testimonios relacionados con industrias',
    isSystem: true,
  },
];

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

  for (const category of BASE_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        isSystem: true,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        isSystem: true,
      },
    });
  }

  console.log('✅ Admin seed ejecutado correctamente');
  console.log({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isActive: admin.isActive,
  });

  console.log('✅ Categorías base creadas/actualizadas correctamente');
}

main()
  .catch((error) => {
    console.error('❌ Error ejecutando seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
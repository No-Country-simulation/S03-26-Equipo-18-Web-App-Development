import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const tags = [
  // Sentimiento
  { name: 'Elogio', slug: 'elogio' },
  { name: 'Crítica Constructiva', slug: 'critica-constructiva' },
  
  // Procedencia / Canal
  { name: 'Desde Twitter/X', slug: 'twitter-x' },
  { name: 'Desde LinkedIn', slug: 'linkedin' },
  { name: 'Product Hunt', slug: 'product-hunt' },

  // Utilidad para el Dev
  { name: 'Feature Request', slug: 'feature-request' },
  { name: 'Bug Report', slug: 'bug-report' },
  { name: 'Landing Page', slug: 'landing-page' }, // Testimonios que van directo a la web
  
  // Segmento
  { name: 'Usuario VIP', slug: 'usuario-vip' },
  { name: 'Beta Tester', slug: 'beta-tester' }
];

  console.log('🌱 Cargando tags iniciales...')

  for (const t of tags) {
    await prisma.tag.upsert({
      where: { slug: t.slug },
      update: {}, // Si ya existe, no hace nada
      create: t,   // Si no existe, lo crea
    })
  }

  //Categorias para lso testimonios
const categories = [
  { name: 'General', slug: 'general', description: 'Categoría por defecto' },
  { name: 'SaaS Product', slug: 'saas', description: 'Testimonios de software' },
  { name: 'Servicios IT', slug: 'servicios-it', description: 'Consultoría y desarrollo' },
  { name: 'E-commerce', slug: 'ecommerce', description: 'Tiendas online' }
];

console.log('🌱 Cargando categorías...');

for (const c of categories) {
  await prisma.category.upsert({
    where: { slug: c.slug },
    update: {},
    create: c,
  });
}
}



main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
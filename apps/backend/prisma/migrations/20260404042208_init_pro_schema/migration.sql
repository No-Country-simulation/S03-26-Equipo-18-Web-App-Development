-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR', 'VISITOR');

-- CreateEnum
CREATE TYPE "TestimonialStatus" AS ENUM ('PENDING', 'DRAFT', 'IN_REVIEW', 'PUBLISHED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('VIEW', 'CLICK_EMBED', 'CLICK_CTA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VISITOR',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonios" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "autor_nombre" TEXT NOT NULL,
    "autor_cargo" TEXT,
    "autor_email" TEXT,
    "autor_empresa" TEXT,
    "status" "TestimonialStatus" NOT NULL DEFAULT 'PENDING',
    "motivo_rechazo" TEXT,
    "usuario_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "publicado_at" TIMESTAMP(3),

    CONSTRAINT "testimonios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "multimedia" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "testimonio_id" TEXT NOT NULL,

    CONSTRAINT "multimedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonios_categorias" (
    "testimonio_id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "testimonios_categorias_pkey" PRIMARY KEY ("testimonio_id","categoria_id")
);

-- CreateTable
CREATE TABLE "testimonios_tags" (
    "testimonio_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "testimonios_tags_pkey" PRIMARY KEY ("testimonio_id","tag_id")
);

-- CreateTable
CREATE TABLE "engagement_events" (
    "id" TEXT NOT NULL,
    "testimonio_id" TEXT NOT NULL,
    "tipo" "EventType" NOT NULL,
    "fuente" TEXT,
    "ip" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "engagement_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nombre_key" ON "categorias"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_slug_key" ON "categorias"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_nombre_key" ON "tags"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- AddForeignKey
ALTER TABLE "testimonios" ADD CONSTRAINT "testimonios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multimedia" ADD CONSTRAINT "multimedia_testimonio_id_fkey" FOREIGN KEY ("testimonio_id") REFERENCES "testimonios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonios_categorias" ADD CONSTRAINT "testimonios_categorias_testimonio_id_fkey" FOREIGN KEY ("testimonio_id") REFERENCES "testimonios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonios_categorias" ADD CONSTRAINT "testimonios_categorias_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonios_tags" ADD CONSTRAINT "testimonios_tags_testimonio_id_fkey" FOREIGN KEY ("testimonio_id") REFERENCES "testimonios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonios_tags" ADD CONSTRAINT "testimonios_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "engagement_events" ADD CONSTRAINT "engagement_events_testimonio_id_fkey" FOREIGN KEY ("testimonio_id") REFERENCES "testimonios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

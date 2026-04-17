// src/modules/dashboard/dashboard.service.ts

import { TestimonialStatus } from "@prisma/client";
import { prisma } from "../../config/prisma";
import type { DashboardResponseDto } from "./dashboard.types";

function roundTo2(value: number) {
  return Number(value.toFixed(2));
}

function buildWeeklyBuckets(weeks = 6) {
  const buckets: {
    name: string;
    start: Date;
    end: Date;
    total: number;
  }[] = [];

  const now = new Date();

  for (let i = weeks - 1; i >= 0; i--) {
    const start = new Date(now);
    start.setDate(now.getDate() - i * 7);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    buckets.push({
      name: `Semana ${weeks - i}`,
      start,
      end,
      total: 0,
    });
  }

  return buckets;
}

export async function getDashboardData(): Promise<DashboardResponseDto> {
  const sixWeeksAgo = new Date();
  sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 42);

  const [
    total,
    aprobados,
    pendientes,
    rechazados,
    featuredCount,
    totalsAgg,
    latestRows,
    topRows,
    recentRows,
  ] = await Promise.all([
    prisma.testimonial.count(),
    prisma.testimonial.count({
      where: { status: TestimonialStatus.PUBLISHED },
    }),
    prisma.testimonial.count({
      where: {
        status: {
          in: [
            TestimonialStatus.PENDING,
            TestimonialStatus.DRAFT,
            TestimonialStatus.IN_REVIEW,
          ],
        },
      },
    }),
    prisma.testimonial.count({
      where: { status: TestimonialStatus.REJECTED },
    }),
    prisma.testimonial.count({
      where: { isFeatured: true },
    }),
    prisma.testimonial.aggregate({
      _sum: {
        views: true,
        clicks: true,
      },
    }),
    prisma.testimonial.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        authorName: true,
        status: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        testimonialTags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.testimonial.findMany({
      take: 5,
      orderBy: [{ views: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        content: true,
        authorName: true,
        views: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.testimonial.findMany({
      where: {
        createdAt: { gte: sixWeeksAgo },
      },
      select: {
        createdAt: true,
      },
    }),
  ]);

  const totalViews = totalsAgg._sum.views ?? 0;
  const totalClicks = totalsAgg._sum.clicks ?? 0;

  const lineBuckets = buildWeeklyBuckets(6);

  for (const row of recentRows) {
    const createdAt = new Date(row.createdAt);

    for (const bucket of lineBuckets) {
      if (createdAt >= bucket.start && createdAt <= bucket.end) {
        bucket.total += 1;
        break;
      }
    }
  }

  const lineChartData = lineBuckets.map(({ name, total }) => ({
    name,
    total,
  }));

  const pieChartData = [
    { name: "Aprobados", value: aprobados },
    { name: "Pendientes", value: pendientes },
    { name: "Rechazados", value: rechazados },
  ];

  const latestTestimonials = latestRows.map((item) => ({
    id: item.id,
    userName: item.authorName,
    content: item.content,
    status: item.status,
    category: item.category
      ? {
          id: item.category.id,
          name: item.category.name,
        }
      : null,
    tags: item.testimonialTags.map((tt) => ({
      id: tt.tag.id,
      name: tt.tag.name,
    })),
  }));

  const topTestimonials = topRows.map((item) => ({
    id: item.id,
    userName: item.authorName,
    content: item.content,
    views: item.views,
    category: item.category
      ? {
          id: item.category.id,
          name: item.category.name,
        }
      : null,
  }));

  const engagementRate =
    totalViews > 0 ? roundTo2((totalClicks / totalViews) * 100) : 0;

  const conversionRate =
    total > 0 ? roundTo2((aprobados / total) * 100) : 0;

  return {
    total,
    aprobados,
    pendientes,
    rechazados,
    totalViews,
    totalClicks,
    avgRating: 0,
    featuredCount,
    engagementRate,
    conversionRate,
    lineChartData,
    pieChartData,
    latestTestimonials,
    topTestimonials,
  };
}
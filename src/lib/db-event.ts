//import { PrismaClient } from "@/prisma/db-event/generated/client";
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaDbEvent: PrismaClient | undefined;
}

export const dbEvent = global.prismaDbEvent || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prismaDbEvent = dbEvent;

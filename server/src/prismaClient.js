// import { PrismaClient } from 'app/generated/prisma/client'

import { PrismaClient, StatusType } from '@prisma/client';

const prisma = new PrismaClient();

export const statusType = StatusType;

export async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("[database]: connected!");
  } catch (err) {
    console.log("[database]: connection error: ", err);
    await prisma.$disconnect();
  }
}

export default prisma;

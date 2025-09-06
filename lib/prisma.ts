// Mock Prisma client for development without database setup
// Remove this file and run 'npx prisma generate' once database is configured

class MockPrismaClient {
  user = {
    findUnique: async (params: any) => {
      // Mock user lookup
      return null;
    },
    create: async (params: any) => {
      // Mock user creation
      return {
        id: 'mock-user-id',
        name: params.data.name,
        email: params.data.email,
        role: params.data.role,
      };
    },
    findMany: async () => {
      // Mock user list
      return [];
    }
  };

  property = {
    findMany: async (params: any) => {
      // Mock property list
      return [];
    },
    findUnique: async (params: any) => {
      // Mock property lookup
      return null;
    },
    create: async (params: any) => {
      // Mock property creation
      return {
        id: 'mock-property-id',
        title: params.data.title,
        price: params.data.price,
      };
    }
  };

  $queryRaw = async (query: any) => {
    // Mock raw query
    return [{ version: 'PostgreSQL 15.0' }];
  };
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: MockPrismaClient | undefined;
}

const prisma = global.prisma || new MockPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };

// TODO: Replace this mock with real Prisma client:
// 1. Set up PostgreSQL database
// 2. Configure DATABASE_URL in .env.local
// 3. Run: npx prisma generate
// 4. Run: npx prisma db push
// 5. Delete this file and restore the original:
/*
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };
*/

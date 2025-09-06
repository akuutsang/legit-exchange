import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Define types for the request query parameters
type PropertyFilters = {
  page?: string;
  limit?: string;
  search?: string;
  type?: string[];
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  status?: string;
  sortBy?: 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const queryParams: PropertyFilters = {
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '12',
      search: searchParams.get('q') || undefined,
      type: searchParams.get('type')?.split(','),
      minPrice: searchParams.get('minPrice') || undefined,
      maxPrice: searchParams.get('maxPrice') || undefined,
      bedrooms: searchParams.get('bedrooms') || undefined,
      status: searchParams.get('status') || undefined,
      sortBy: (searchParams.get('sortBy') as 'price' | 'createdAt') || 'createdAt',
      sortOrder: (searchParams.get('sortBy') as 'asc' | 'desc') || 'desc',
    };

    // Build the where clause for filtering
    const where: any = {
      status: 'AVAILABLE', // Only show available properties by default
    };

    // Search by title, description, or address
    if (queryParams.search) {
      where.OR = [
        { title: { contains: queryParams.search, mode: 'insensitive' } },
        { description: { contains: queryParams.search, mode: 'insensitive' } },
        { address: { contains: queryParams.search, mode: 'insensitive' } },
      ];
    }

    // Filter by property type
    if (queryParams.type && queryParams.type.length > 0) {
      where.type = { in: queryParams.type };
    }

    // Filter by price range
    if (queryParams.minPrice || queryParams.maxPrice) {
      where.price = {};
      if (queryParams.minPrice) {
        where.price.gte = parseFloat(queryParams.minPrice);
      }
      if (queryParams.maxPrice) {
        where.price.lte = parseFloat(queryParams.maxPrice);
      }
    }

    // Filter by number of bedrooms
    if (queryParams.bedrooms) {
      if (queryParams.bedrooms.endsWith('+')) {
        // For '5+' filter
        const minBedrooms = parseInt(queryParams.bedrooms);
        where.bedrooms = { gte: minBedrooms };
      } else {
        where.bedrooms = parseInt(queryParams.bedrooms);
      }
    }

    // Filter by status
    if (queryParams.status && queryParams.status !== 'all') {
      where.status = queryParams.status.toUpperCase();
    }

    // Parse pagination parameters
    const page = parseInt(queryParams.page || '1');
    const limit = parseInt(queryParams.limit || '10');
    const skip = (page - 1) * limit;

    // Build orderBy clause for sorting
    const orderBy = queryParams.sortBy && queryParams.sortOrder ? {
      [queryParams.sortBy]: queryParams.sortOrder,
    } : undefined;

    // Execute the query with filters and pagination
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.property.count({ where }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Format the response
    const response = {
      data: properties.map(property => ({
        id: property.id,
        title: property.title,
        price: property.price,
        type: property.type,
        status: property.status,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        location: property.address,
        city: property.city,
        featured: property.featured,
        image: '/placeholder-property.jpg', // Mock image for now
        owner: property.owner,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

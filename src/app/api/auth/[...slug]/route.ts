import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://localhost:4000/api';

export async function POST(request: NextRequest, { params }: { params: { slug: string[] } }) {
  try {
    const slug = params.slug.join('/');
    const url = `${API_BASE_URL}/auth/${slug}`;
    
    const body = await request.text();
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Connection failed' },
      { status: 500 }
    );
  }
}
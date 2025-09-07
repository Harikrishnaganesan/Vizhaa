import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://vizhaa-backend-1.onrender.com/api'
  : 'http://localhost:4000/api';

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;
    const slugPath = slug.join('/');
    const url = `${API_BASE_URL}/auth/${slugPath}`;
    
    const contentType = request.headers.get('content-type');
    let body;
    let headers: Record<string, string> = {};
    
    if (contentType?.includes('multipart/form-data')) {
      body = await request.formData();
    } else {
      body = await request.text();
      headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { success: false, message: `HTTP ${response.status}: ${errorText}` };
      }
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Connection failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;
    const slugPath = slug.join('/');
    const url = `${API_BASE_URL}/auth/${slugPath}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { success: false, message: `HTTP ${response.status}: ${errorText}` };
      }
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Connection failed' },
      { status: 500 }
    );
  }
}
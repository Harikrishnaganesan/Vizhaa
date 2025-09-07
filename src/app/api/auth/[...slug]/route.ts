import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://vizhaa-backend-1.onrender.com/api'
  : 'http://localhost:4000/api';

<<<<<<< HEAD
export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
=======
export async function POST(request: NextRequest, { params }: { params: { slug: string[] } }) {
>>>>>>> 7e92d227ae97a43368f963625d0168584731c60c
  try {
    const { slug } = await params;
    const slugPath = slug.join('/');
    const url = `${API_BASE_URL}/auth/${slugPath}`;
    
<<<<<<< HEAD
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
=======
    const body = await request.text();
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
>>>>>>> 7e92d227ae97a43368f963625d0168584731c60c
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

<<<<<<< HEAD
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
=======
export async function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
>>>>>>> 7e92d227ae97a43368f963625d0168584731c60c
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
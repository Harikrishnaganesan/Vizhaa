import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = 'http://localhost:4000/api';
    
    const response = await fetch(`${backendUrl}/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.text();
    
    return NextResponse.json({
      success: true,
      backendUrl,
      backendStatus: response.status,
      backendResponse: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Next.js API working',
  });
}
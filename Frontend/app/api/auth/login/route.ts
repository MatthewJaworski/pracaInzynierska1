import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const url = getUrl('login', 'auth');
  const data = await request.json();
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Accept-Language': acceptLanguage
      },
      withCredentials: true
    });
    const response = NextResponse.json(res.data);

    const setCookies = res.headers['set-cookie'];

    if (setCookies && Array.isArray(setCookies)) {
      setCookies.forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie);
      });
    }

    return response;
  } catch (error) {
    if (!isAxiosError(error))
      return Response.json('Interial server error', { status: 500 });
    return Response.json(error.message, {
      status: error.response?.status ?? 500
    });
  }
};

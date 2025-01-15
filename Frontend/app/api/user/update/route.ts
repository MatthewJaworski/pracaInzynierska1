import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const url = getUrl('updateUser', 'bff');
  const authentication = cookies().get('Authentication')?.value;
  const data = await request.json();

  try {
    const res = await axios.patch(url, data, {
      headers: {
        'Accept-Language': acceptLanguage,
        Authorization: `Bearer ${authentication}`
      },
      withCredentials: true
    });
    const response = NextResponse.json(res.data);
    return response;
  } catch (error) {
    if (!isAxiosError(error))
      return Response.json('Interial server error', { status: 500 });
    return Response.json(error.message, {
      status: error.response?.status ?? 500
    });
  }
};

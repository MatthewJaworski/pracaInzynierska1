import { getJwtData } from '@/lib/get-jtw-data';
import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language') || 'en';
  const url = getUrl('postComment', 'bff');
  const authentication = cookies().get('Authentication')?.value;
  const data = await request.json();

  const { userId, role } = await getJwtData();
  data.userId = userId;
  data.userRole = role;

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Accept-Language': acceptLanguage,
        Authorization: `Bearer ${authentication}`
      },
      withCredentials: true
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    if (!isAxiosError(error))
      return Response.json('internal server error', { status: 500 });
    return Response.json(error.response?.data, {
      status: error.response?.status ?? 500
    });
  }
};

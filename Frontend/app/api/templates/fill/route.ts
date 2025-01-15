import { getJwtData } from '@/lib/get-jtw-data';
import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const url = getUrl('fillTemplate', 'bff');
  const authentication = cookies().get('Authentication')?.value;
  const data = await request.json();
  const { userId } = await getJwtData();
  data.userId = userId;

  try {
    const res = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': acceptLanguage,
        Authorization: `Bearer ${authentication}`
      },
      withCredentials: true
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    if (!isAxiosError(error))
      return Response.json('internal server error', { status: 500 });
    return Response.json(error.response?.data, {
      status: error.response?.status ?? 500
    });
  }
};

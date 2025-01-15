import { getJwtData } from '@/lib/get-jtw-data';
import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const authentication = cookies().get('Authentication')?.value;
  const { userId } = await getJwtData();
  const url = getUrl('getUser', 'bff') + `/${userId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Accept-Language': acceptLanguage,
        Authorization: `Bearer ${authentication}`
      },
      withCredentials: true
    });

    return Response.json(response.data);
  } catch (error: any) {
    if (!isAxiosError(error))
      return Response.json('internal server error', { status: 500 });
    return Response.json(error.response?.data, {
      status: error.response?.status ?? 500
    });
  }
};

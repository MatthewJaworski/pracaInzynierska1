import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const url = getUrl('activateUser', 'auth');
  const data = await request.json();

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Accept-Language': acceptLanguage
      },
      withCredentials: true
    });

    return Response.json(response.data);
  } catch (error) {
    if (!isAxiosError(error))
      return Response.json('Interial server error', { status: 500 });
    return Response.json(error.message, {
      status: error.response?.status ?? 500
    });
  }
};

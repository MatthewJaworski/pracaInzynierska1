import { getUrl } from '@/lib/getUrl';
import { FillTempalte } from '@/types/fill-template';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const PATCH = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const authentication = cookies().get('Authentication')?.value;

  const data = (await request.json()) as FillTempalte & { documentId: string };
  const url = getUrl('updateDocumentFields', 'bff');

  try {
    const response = await axios.patch(url, data, {
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

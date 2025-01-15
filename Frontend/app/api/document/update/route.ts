import { getJwtData } from '@/lib/get-jtw-data';
import { getUrl } from '@/lib/getUrl';
import { UpdateDocumentDto } from '@/types/document';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const authentication = cookies().get('Authentication')?.value;
  const { userId } = await getJwtData();

  const data = (await request.json()) as UpdateDocumentDto;
  const { id, ...requestData } = data;
  const url = getUrl('updateDocument', 'bff') + `/${id}`;

  requestData.updatedBy = userId;

  try {
    const res = await axios.put(url, requestData, {
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

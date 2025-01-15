import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export const POST = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language') || 'en';
  const url = getUrl('addAttachment', 'bff');
  const authentication = cookies().get('Authentication')?.value;

  const formData = await request.formData();
  const files = formData.getAll('files') as File[];
  const documentId = formData.get('documentId') as string;

  const forwardFormData = new FormData();

  forwardFormData.append('documentId', documentId);

  for (const file of files) {
    forwardFormData.append('files', file, file.name);
  }

  try {
    const response = await axios.post(url, forwardFormData, {
      headers: {
        'Accept-Language': acceptLanguage,
        'Content-Type': 'multipart/form-data',
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

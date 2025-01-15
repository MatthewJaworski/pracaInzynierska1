import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const url = getUrl('postTemplate', 'bff');

  const form = await request.formData();

  const templateFile = form.get('templateFile') as File;
  form.delete('templateFile');

  const formData = new FormData();
  formData.append('file', templateFile, templateFile.name);

  form.forEach((value, key) => {
    formData.append(key, value);
  });

  const authentication = cookies().get('Authentication')?.value;

  try {
    const res = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

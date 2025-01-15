import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const url = getUrl('updateTemplate', 'bff');
  const authentication = cookies().get('Authentication')?.value;

  try {
    const form = await request.formData();

    const templateFile = form.get('templateFile') as File | null;
    if (templateFile) {
      form.delete('templateFile');
    }

    const formData = new FormData();
    if (templateFile) {
      formData.append('file', templateFile, templateFile.name);
    }

    form.forEach((value, key) => {
      formData.append(key, value);
    });

    const res = await axios.patch(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

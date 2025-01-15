import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { templateId: string } }
) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const authentication = cookies().get('Authentication')?.value;
  const templateId = params.templateId;
  const searchParams = request.nextUrl.searchParams;
  const userType = searchParams.get('for') as 'student' | 'dean';
  const url =
    getUrl('getFieldsForTemplate', 'bff') + `/${templateId}?for=${userType}`;

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

import { getUrl } from '@/lib/getUrl';
import { Role } from '@/types/role';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { role: Role } }
) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const authentication = cookies().get('Authentication')?.value;
  const searchParams = request.nextUrl.searchParams;
  const safeData = searchParams.get('safe');
  const url =
    getUrl('usersByRole', 'bff') + `/${params.role}?safeData=${safeData}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Accept-Language': acceptLanguage,
        Authorization: `Bearer ${authentication}`
      },
      params: {
        safeData
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

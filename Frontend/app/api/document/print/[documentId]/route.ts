import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { documentId: string } }
) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const authentication = cookies().get('Authentication')?.value;
  const documentId = params.documentId;
  const url = getUrl('printDocument') + `/${documentId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Accept-Language': acceptLanguage,
        Authorization: `Bearer ${authentication}`
      },
      withCredentials: true,
      responseType: 'arraybuffer'
    });
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="document_${documentId}.pdf"`
      },
      status: 200
    });
  } catch (error: any) {
    if (!isAxiosError(error))
      return Response.json('internal server error', { status: 500 });
    return Response.json(error.response?.data, {
      status: error.response?.status ?? 500
    });
  }
};

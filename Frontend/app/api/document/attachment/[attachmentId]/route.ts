import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { attachmentId: string } }
) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const authentication = cookies().get('Authentication')?.value;
  const attachmentId = params.attachmentId;
  const url = getUrl('downloadAttachment') + `/${attachmentId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Accept-Language': acceptLanguage,
        Authorization: `Bearer ${authentication}`
      },
      withCredentials: true,
      responseType: 'arraybuffer'
    });

    const contentType =
      response.headers['content-type'] || 'application/octet-stream';
    const contentDisposition =
      response.headers['content-disposition'] ||
      `attachment; filename="attachment_${attachmentId}"`;

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition
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

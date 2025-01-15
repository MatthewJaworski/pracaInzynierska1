import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import axios from 'axios';
import { getUrl } from '@/lib/getUrl';

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

    const pdfBuffer = response.data;
    const base64Pdf = Buffer.from(pdfBuffer).toString('base64');

    return NextResponse.json({ base64Pdf });
  } catch (error: any) {
    if (!isAxiosError(error)) {
      return NextResponse.json('Internal server error', { status: 500 });
    }
    return NextResponse.json(error.response?.data, {
      status: error.response?.status ?? 500
    });
  }
};

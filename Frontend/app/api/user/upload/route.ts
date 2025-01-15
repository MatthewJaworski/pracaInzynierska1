import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import Papa from 'papaparse';

export const POST = async (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  const url = getUrl('registerMany', 'bff');
  const authentication = cookies().get('Authentication')?.value;

  const file = (await request.formData()).get('files') as File;

  const text = await file.text();

  const parsedData = Papa.parse(text, {
    header: true,
    skipEmptyLines: true
  });

  if (parsedData.errors.length) {
    return Response.json(
      { error: 'Error parsing CSV file' + JSON.stringify(parsedData.errors) },
      { status: 400 }
    );
  }

  const jsonData = parsedData.data;

  try {
    const response = await axios.post(url, jsonData, {
      headers: {
        'Accept-Language': acceptLanguage,
        Authorization: `Bearer ${authentication}`
      },
      timeout: 2000
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

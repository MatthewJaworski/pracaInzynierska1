import { getUrl } from '@/lib/getUrl';
import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (_request: NextRequest) => {
  const url = getUrl('refreshTokens', 'auth');
  const refreshToken = cookies().get('Refresh')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: 'No refresh token provided' },
      { status: 401 }
    );
  }

  try {
    const tokensResponse = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        },
        withCredentials: true
      }
    );

    const setCookies = tokensResponse.headers['set-cookie'];
    const response = NextResponse.json({
      success: true,
      ...tokensResponse.data
    });

    if (setCookies && Array.isArray(setCookies)) {
      setCookies.forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie);
      });
    }

    return response;
  } catch (error) {
    if (!isAxiosError(error)) {
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message },
      {
        status: error.response?.status ?? 500
      }
    );
  }
};

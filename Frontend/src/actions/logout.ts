'use server';

import { cookies } from 'next/headers';

export const logoutAction = async () => {
  cookies().set({
    name: 'Authentication',
    value: '',
    maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  cookies().set({
    name: 'Refresh',
    value: '',
    maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

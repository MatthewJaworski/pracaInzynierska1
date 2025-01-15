import { ReadonlyURLSearchParams } from 'next/navigation';
export type SetQueryParam = {
  name: string;
  value: string;
  searchParams: ReadonlyURLSearchParams;
};
export const setQueryParam = ({ name, searchParams, value }: SetQueryParam) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};

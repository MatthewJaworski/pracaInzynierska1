import { useMediaQuery } from 'react-responsive';

export const useDesktop = () => useMediaQuery({ query: '(min-width: 1280px)' });

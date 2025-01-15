export const PUBLIC_URLS = ['/login', '/activate'];
export const ADMIN_URLS = ['/templates', '/fields'];
export const STUDENT_URLS = ['/profile', '/documents'];
export const DEPARTMENT_WORKER_URLS = ['/archivum'];

export const REDIRECT_URLS = {
  admin: '/dashboard',
  student: '/dashboard',
  dean: '/dashboard',
  'department-worker': '/dashboard'
};

export const roleConfig = {
  admin: {
    forbidenUrl: [...STUDENT_URLS, '/documents/create'],
    redirectUrl: '/dashboard'
  },
  student: {
    forbidenUrl: [...ADMIN_URLS],
    redirectUrl: '/dashboard'
  },
  dean: {
    forbidenUrl: [...ADMIN_URLS, '/documents/create'],
    redirectUrl: '/dashboard'
  },
  'department-worker': {
    forbidenUrl: [...ADMIN_URLS, '/documents/create'],
    redirectUrl: '/dashboard'
  }
};

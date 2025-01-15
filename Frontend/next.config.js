module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      },
      {
        source: '/pl',
        destination: '/pl/dashboard',
        permanent: true
      },
      {
        source: '/en',
        destination: '/en/dashboard',
        permanent: true
      }
    ];
  }
};

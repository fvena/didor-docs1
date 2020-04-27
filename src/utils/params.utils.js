const getSection = routerPath => {
  if (!routerPath || routerPath === '/') return '/';

  const splitPath = routerPath.split('/').filter(item => item !== '');
  return `/${splitPath.shift()}`;
};

export default {
  getSection,
};

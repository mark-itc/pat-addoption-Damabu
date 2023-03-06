export const getDataCookies = (name) => {
  const cookie = document.cookie;
  const cookieArray = cookie.split(';');

  let value = '';
  cookieArray.filter((item) => {
    if (item.includes(name)) {
      const igual = item.indexOf('=');
      value = item.slice(igual + 1);
    }
  });
  return value;
};

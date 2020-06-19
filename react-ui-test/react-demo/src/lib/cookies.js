import Cookies from 'js-cookie';

export const setCookies = (key, value) => {
  Cookies.set (key, value);
};
export const getCookies = key => {
  return Cookies.get (key);
};

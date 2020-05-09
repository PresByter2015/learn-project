import { loginUrl } from 'config/urls';

/**
 * 跳转到登录页面
 */
export function redirectToSignIn() {
  location.href = `${loginUrl}?return_insite=${decodeURIComponent(location.href)}`;
}

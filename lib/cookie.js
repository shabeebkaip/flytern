import { cookies } from 'next/headers';

export function getCookie(name) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  if (!cookie) {
    return null;
  }
  return cookie.value.replace(/(^")|("$)/g, '');
}

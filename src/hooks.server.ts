import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
  const SITE_PASSWORD = env.SITE_PASSWORD;

  // Skip auth if no password is set
  if (!SITE_PASSWORD) {
    return await resolve(event, {});
  }

  const auth = event.request.headers.get('Authorization');

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [, password] = decoded.split(':');
      if (password === SITE_PASSWORD) {
        return await resolve(event, {});
      }
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected Site"'
    }
  });
};

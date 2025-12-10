import { redirect, type Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
  const SITE_PASSWORD = env.SITE_PASSWORD;

  // Skip auth if no password is set
  if (!SITE_PASSWORD) {
    return await resolve(event, {});
  }

  // Allow access to login page
  if (event.url.pathname === '/login') {
    return await resolve(event, {});
  }

  // Check for auth cookie
  const authenticated = event.cookies.get('authenticated');
  if (authenticated === 'true') {
    return await resolve(event, {});
  }

  // Redirect to login
  throw redirect(303, '/login');
};

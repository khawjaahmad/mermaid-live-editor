import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get('password');

    if (password === env.SITE_PASSWORD) {
      cookies.set('authenticated', 'true', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      throw redirect(303, '/edit');
    }

    return fail(401, { error: 'Your credentials are as real as your hopes and dreams!' });
  }
};

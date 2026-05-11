import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 as zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types.js';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  terms: z.boolean().refine((v) => v === true, {
    message: 'You must accept the terms and conditions'
  })
});

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(signupSchema), { id: 'inline' }),
    dialogueForm: await superValidate(zod(signupSchema), { id: 'dialogue' })
  };
};

export const actions: Actions = {
  main: async ({ request }) => {
    const form = await superValidate(request, zod(signupSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    return { form, success: true };
  },
  dialogue: async ({ request }) => {
    const form = await superValidate(request, zod(signupSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    return { form, success: true };
  }
};

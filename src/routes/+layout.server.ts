import { DEFAULT_CONFIG, type ThemeConfig } from '$lib/utils/theme.svelte.js';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = ({ cookies }) => {
  const themeCookie = cookies.get('ogonek-m3-theme-config');
  let themeConfig: ThemeConfig = DEFAULT_CONFIG;

  if (themeCookie) {
    try {
      themeConfig = JSON.parse(decodeURIComponent(themeCookie));
    } catch (e) {
      console.error('Failed to parse theme cookie', e);
    }
  }

  return {
    themeConfig
  };
};

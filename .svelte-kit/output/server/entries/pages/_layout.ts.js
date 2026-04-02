import { isBrowser, createBrowserClient, createServerClient } from "@supabase/ssr";
const load = async ({ data, depends, fetch }) => {
  depends("supabase:auth");
  const supabase = isBrowser() ? createBrowserClient(data.url, data.anonKey, {
    global: { fetch }
  }) : createServerClient(data.url, data.anonKey, {
    global: { fetch },
    cookies: {
      getAll() {
        return data.cookies;
      }
    }
  });
  return { ...data, supabase };
};
export {
  load
};

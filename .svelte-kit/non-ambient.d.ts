
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/invoices" | "/api/invoices/[id]" | "/api/invoices/[id]/view" | "/auth" | "/auth/callback" | "/clients" | "/clients/new" | "/clients/[id]" | "/dashboard" | "/estimates" | "/estimates/new" | "/estimates/[id]" | "/estimates/[id]/preview" | "/expenses" | "/expenses/new" | "/forgot-password" | "/invoices" | "/invoices/new" | "/invoices/[id]" | "/invoices/[id]/preview" | "/items" | "/items/new" | "/items/[id]" | "/login" | "/logout" | "/reset-password" | "/settings" | "/signup" | "/view" | "/view/[id]";
		RouteParams(): {
			"/api/invoices/[id]": { id: string };
			"/api/invoices/[id]/view": { id: string };
			"/clients/[id]": { id: string };
			"/estimates/[id]": { id: string };
			"/estimates/[id]/preview": { id: string };
			"/invoices/[id]": { id: string };
			"/invoices/[id]/preview": { id: string };
			"/items/[id]": { id: string };
			"/view/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/api": { id?: string };
			"/api/invoices": { id?: string };
			"/api/invoices/[id]": { id: string };
			"/api/invoices/[id]/view": { id: string };
			"/auth": Record<string, never>;
			"/auth/callback": Record<string, never>;
			"/clients": { id?: string };
			"/clients/new": Record<string, never>;
			"/clients/[id]": { id: string };
			"/dashboard": Record<string, never>;
			"/estimates": { id?: string };
			"/estimates/new": Record<string, never>;
			"/estimates/[id]": { id: string };
			"/estimates/[id]/preview": { id: string };
			"/expenses": Record<string, never>;
			"/expenses/new": Record<string, never>;
			"/forgot-password": Record<string, never>;
			"/invoices": { id?: string };
			"/invoices/new": Record<string, never>;
			"/invoices/[id]": { id: string };
			"/invoices/[id]/preview": { id: string };
			"/items": { id?: string };
			"/items/new": Record<string, never>;
			"/items/[id]": { id: string };
			"/login": Record<string, never>;
			"/logout": Record<string, never>;
			"/reset-password": Record<string, never>;
			"/settings": Record<string, never>;
			"/signup": Record<string, never>;
			"/view": { id?: string };
			"/view/[id]": { id: string }
		};
		Pathname(): "/" | `/api/invoices/${string}/view` & {} | "/auth/callback" | "/clients" | "/clients/new" | `/clients/${string}` & {} | "/dashboard" | "/estimates" | "/estimates/new" | `/estimates/${string}` & {} | `/estimates/${string}/preview` & {} | "/expenses" | "/expenses/new" | "/forgot-password" | "/invoices" | "/invoices/new" | `/invoices/${string}` & {} | `/invoices/${string}/preview` & {} | "/items" | "/items/new" | `/items/${string}` & {} | "/login" | "/logout" | "/reset-password" | "/settings" | "/signup" | `/view/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}
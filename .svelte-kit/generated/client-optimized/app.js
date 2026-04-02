export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26')
];

export const server_loads = [0];

export const dictionary = {
		"/": [2],
		"/clients": [3],
		"/clients/new": [5],
		"/clients/[id]": [4],
		"/dashboard": [6],
		"/estimates": [7],
		"/estimates/new": [10],
		"/estimates/[id]": [8],
		"/estimates/[id]/preview": [9],
		"/expenses": [11],
		"/expenses/new": [12],
		"/forgot-password": [13],
		"/invoices": [14],
		"/invoices/new": [17],
		"/invoices/[id]": [15],
		"/invoices/[id]/preview": [16],
		"/items": [18],
		"/items/new": [20],
		"/items/[id]": [19],
		"/login": [21],
		"/logout": [~22],
		"/reset-password": [23],
		"/settings": [24],
		"/signup": [25],
		"/view/[id]": [26]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';
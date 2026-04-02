import * as server from '../entries/pages/forgot-password/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/forgot-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/forgot-password/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.PBCpGiYW.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CFi_PFdS.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DPW7uwU3.js","_app/immutable/chunks/CV5NeH-J.js","_app/immutable/chunks/DrHEedA-.js","_app/immutable/chunks/BIwb6wPz.js","_app/immutable/chunks/CWGBfm7c.js","_app/immutable/chunks/Co39YXqS.js","_app/immutable/chunks/DBI2pyv_.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/Bt0QNoC1.js","_app/immutable/chunks/Dd8xkO-4.js","_app/immutable/chunks/B17Q6ahh.js"];
export const stylesheets = [];
export const fonts = [];

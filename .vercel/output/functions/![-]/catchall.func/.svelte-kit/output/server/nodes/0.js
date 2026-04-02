import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.C_vWuspA.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DBI2pyv_.js","_app/immutable/chunks/CFi_PFdS.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DPW7uwU3.js","_app/immutable/chunks/vTOw4rBc.js","_app/immutable/chunks/Dd8xkO-4.js","_app/immutable/chunks/CV5NeH-J.js","_app/immutable/chunks/nrE3S_8I.js","_app/immutable/chunks/DENmn9Ry.js","_app/immutable/chunks/BVRur728.js","_app/immutable/chunks/BcPsjgHq.js","_app/immutable/chunks/GTZ0UXvo.js","_app/immutable/chunks/CSagv-P3.js","_app/immutable/chunks/Co39YXqS.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/Bt0QNoC1.js","_app/immutable/chunks/B17Q6ahh.js","_app/immutable/chunks/CgJGrVbJ.js","_app/immutable/chunks/btCIAIG0.js","_app/immutable/chunks/CC-3peeg.js","_app/immutable/chunks/BqE__5w-.js","_app/immutable/chunks/CH84uPzE.js","_app/immutable/chunks/C3UpFAqN.js","_app/immutable/chunks/DVqWscaw.js","_app/immutable/chunks/BxG29i9S.js","_app/immutable/chunks/D2i0vvGT.js"];
export const stylesheets = ["_app/immutable/assets/0.CF-PZoJk.css"];
export const fonts = [];

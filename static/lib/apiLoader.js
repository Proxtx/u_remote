export const remoteApi = await framework.load("remoteApi.js");
export const keysApi = await framework.load("keys.js");

window.keysApi = keysApi;
window.remoteApi = remoteApi;

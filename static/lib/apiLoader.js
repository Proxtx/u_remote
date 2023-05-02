export const remoteApi = await framework.load("remoteApi.js");
export const keysApi = await framework.load("keys.js");

window.keysApi = keysApi;
window.remoteApi = remoteApi;
cookie.default =

  "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure;";

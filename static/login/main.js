import * as _ from "/lib/guiLoader.js";

const meta = await framework.load("meta.js");
const password = document.getElementById("password");

await uiBuilder.ready(password);

password.addEventListener("change", async () => {
  if (await meta.auth(password.component.value)) {
    cookie.pwd = password.component.value;
    location.pathname = "/";
  } else {
    password.component.value = "";
  }
});

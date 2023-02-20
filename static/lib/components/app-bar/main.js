export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.status = this.document.getElementById("status");
    (async () => {
      if (window.remoteApi && !(await remoteApi.isActive(cookie.pwd))) {
        this.document.getElementById("statusText").innerText =
          "Client is offline";
        this.document.getElementById("statusIndicator").style.backgroundColor =
          "#d81e5b";
      }

      this.status.style.display = "flex";
    })();

    this.status.addEventListener("click", async () => {
      let u = new URL(await window.remoteApi.unifyUrl);
      u.pathname = "/";
      location.href = u.href;
    });
  }
}

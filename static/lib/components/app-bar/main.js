export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    (async () => {
      if (window.remoteApi && !(await remoteApi.isActive(cookie.pwd))) {
        this.document.getElementById("statusText").innerText =
          "Client is offline";
        this.document.getElementById("statusIndicator").style.backgroundColor =
          "#d81e5b";
      }
    })();
  }
}

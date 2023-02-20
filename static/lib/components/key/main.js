export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.wrap = this.document.getElementById("wrap");
    this.text = this.document.getElementById("text");
    this.wrap.addEventListener("click", () => {
      window.keysApi.pressKeys(cookie.pwd, this.name);
      window.reloadActiveScreen();
    });
  }

  setConfig = (name) => {
    this.name = name;
    this.text.innerText = name;
  };
}

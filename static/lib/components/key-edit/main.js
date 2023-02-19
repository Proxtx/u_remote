export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.nameElem = this.document.getElementById("name");
    this.sequenceElem = this.document.getElementById("sequence");

    this.nameElem.addEventListener("change", async () => {
      await keysApi.setKeys(cookie.pwd, this.name, "");
      await keysApi.setKeys(
        cookie.pwd,
        this.nameElem.component.value,
        this.sequenceElem.component.value
      );
      this.name = this.nameElem.component.value;
      reloadKeys(true);
    });

    this.sequenceElem.addEventListener("change", async () => {
      await keysApi.setKeys(
        cookie.pwd,
        this.name,
        this.sequenceElem.component.value
      );
      reloadKeys(true);
    });
  }

  setConfig = async (name, sequence) => {
    this.name = name;
    await uiBuilder.ready(this.nameElem);
    await uiBuilder.ready(this.sequenceElem);
    this.nameElem.component.value = name;
    this.sequenceElem.component.value = sequence;
  };
}

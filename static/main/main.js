import { remoteApi, keysApi } from "/lib/apiLoader.js";
import * as _ from "/lib/guiLoader.js";

const screensWrap = document.getElementById("screensWrap");
const mainScreen = document.getElementById("mainScreen");
const screenBox = document.getElementById("screenBox");
const reload = document.getElementById("reload");
const keysWrap = document.getElementById("keysWrap");
const add = document.getElementById("add");
const keysEditWrap = document.getElementById("keysEditWrap");
const send = document.getElementById("send");
const sequence = document.getElementById("sequence");
const sendCommand = document.getElementById("sendCommand");
const program = document.getElementById("program");
const argumentsInput = document.getElementById("arguments");
const contentWrap = document.getElementById("contentWrap");

sendCommand.addEventListener("click", async () => {
  remoteApi.command(
    cookie.pwd,
    program.component.value,
    argumentsInput.component.value
  );
  reloadActiveScreen;
});

send.addEventListener("click", async () => {
  remoteApi.simulate(cookie.pwd, sequence.component.value);
  reloadActiveScreen();
});

const reloadActiveScreen = async () => {
  await new Promise((r) => setTimeout(r, 500));
  if (activeScreen) {
    let srcString =
      "data:image/png;base64," + (await loadScreen(activeScreen.index));
    mainScreen.src = srcString;
    screensWrap.children[activeScreen.index].src = srcString;
  }
};

window.reloadActiveScreen = reloadActiveScreen;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

reload.addEventListener("click", () => {
  reloadScreens();
});

const loadScreen = async (index) => {
  let screenshot = "";
  do {
    if (screenshot != "") alert("Screenshot failed to load. Retry.");
    screenshot = await remoteApi.screenshot(cookie.pwd, index);
  } while (screenshot.length < 500 || !screenshot);
  return screenshot;
};

const loadScreens = async () => {
  let screens = await remoteApi.getScreens(cookie.pwd);
  screens.forEach((value, index) => {
    let info;
    eval("info = " + value.split("DisplayInfo")[1]);
    screens[index] = info;
  });
  for (let screen in screens)
    screens[screen] = {
      ...{ data: await loadScreen(screen), index: screen },
      ...screens[screen],
    };

  return screens;
};

const reloadScreens = async () => {
  screensWrap.innerHTML = "";
  let screens = await loadScreens();
  for (let screen of screens) {
    let img = document.createElement("img");
    img.src = "data:image/png;base64," + screen.data;
    img.addEventListener("click", () => {
      selectScreen(screen);
    });
    img.classList.add("screen");

    if (activeScreen && activeScreen.index == screen.index)
      mainScreen.src = "data:image/png;base64," + screen.data;

    screensWrap.appendChild(img);
  }
};

let activeScreen;

const selectScreen = (screen) => {
  mainScreen.style.display = "block";
  mainScreen.src = "data:image/png;base64," + screen.data;
  activeScreen = screen;
  screenBox.style.height = getComputedStyle(mainScreen).height;
};

mainScreen.addEventListener("click", async (e) => {
  let rect = e.target.getBoundingClientRect();
  let x = Math.floor(
    (mainScreen.naturalWidth / rect.width) * (e.clientX - rect.left) +
      activeScreen.x
  );
  let y = Math.floor(
    (mainScreen.naturalHeight / rect.height) * (e.clientY - rect.top) +
      activeScreen.y
  );
  await remoteApi.simulate(
    cookie.pwd,
    `{+MOUSE}${x},${y}{+LEFTMOUSE}{+WAIT}100{-LEFTMOUSE}`
  );
  reloadActiveScreen();
});

const reloadKeys = async (skipEdit = false) => {
  keysWrap.innerHTML = "";
  let keys = (await keysApi.getKeys(cookie.pwd)).keys;
  for (let name in keys) {
    let key = document.createElement("r-key");
    await uiBuilder.ready(key);
    key.component.setConfig(name);
    keysWrap.appendChild(key);
    if (!skipEdit) {
      let keysEdit = document.createElement("r-key-edit");
      await uiBuilder.ready(keysEdit);
      keysEdit.component.setConfig(name, keys[name]);
      keysEditWrap.insertBefore(keysEdit, add);
    }
  }
};

add.addEventListener("click", async () => {
  await keysApi.setKeys(cookie.pwd, "New Sequence", "hi");
  window.location = window.location;
});

window.reloadKeys = reloadKeys;

if (await remoteApi.isActive(cookie.pwd)) {
  reloadKeys();
  reloadScreens();
} else {
  contentWrap.innerHTML =
    '<div class="box"><h3>Client is offline.</h3> <m-button onclick="setTimeout(() => location.reload(), 100)">Reload</m-button></div>';
  document
    .querySelector("m-overwrite-container")
    .component.component.findAndApplyCascadingVars();
}

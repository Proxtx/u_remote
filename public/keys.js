import { auth } from "./meta.js";
import fs from "fs/promises";
import { simulate } from "./remoteApi.js";

export const getKeys = async (pwd) => {
  if (!(await auth(pwd))) return;
  return await loadKeys();
};

export const setKeys = async (pwd, name, sequence) => {
  if (!(await auth(pwd))) return;
  if (sequence == "") sequence = undefined;
  let keys = await loadKeys();
  keys.keys[name] = sequence;
  await saveKeys(keys);
};

export const pressKeys = async (pwd, name) => {
  if (!(await auth(pwd))) return;
  let sequence = (await loadKeys()).keys[name];
  await simulate(pwd, sequence);
};

const loadKeys = async () => {
  return JSON.parse(await fs.readFile("keys.json", "utf-8"));
};

const saveKeys = async (keys) => {
  await fs.writeFile("keys.json", JSON.stringify(keys, null, 2));
};

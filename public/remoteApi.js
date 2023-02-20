import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";
import config from "@proxtx/config";

let api = await genCombine(config.apiUrl, "public/api.js", genModule);

export const getScreens = async (pwd) => {
  return await api.execute(pwd, config.screenshot, "screens", []);
};

export const screenshot = async (pwd, screenIndex) => {
  return await api.execute(pwd, config.screenshot, "screenshot", [screenIndex]);
};

export const simulate = async (pwd, sequence) => {
  return await api.execute(pwd, config.simulate, "keys", [sequence]);
};

export const isActive = async (pwd) => {
  let definitions = await api.getDefinitions(pwd, config.activeClients);
  return definitions.methods[config.client] ? true : false;
};

export const command = async (pwd, program, args) => {
  return await api.execute(pwd, config.command, "command", [program, args]);
};

export const unifyUrl = config.apiUrl;

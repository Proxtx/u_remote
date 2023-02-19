import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";
import config from "@proxtx/config";

let api = await genCombine(config.apiUrl, "public/meta.js", genModule);
export const auth = async (pwd) => {
  return await api.auth(pwd);
};

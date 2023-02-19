import { auth } from "../../public/meta.js";

export const server = async (document, options) => {
  if (await auth(options.req.cookies.pwd)) return options.res.redirect("/main");
  options.res.redirect("/login");
};

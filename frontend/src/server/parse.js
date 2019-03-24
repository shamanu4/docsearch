import fs from "fs";
import { parse } from "node-html-parser";

export default path => {
  const file = fs.readFileSync(path, "utf8");
  const html = parse(file);
  const head = html.querySelector("head");
  const body = html.querySelector("body");
  const headString = head.toString();
  const bodyString = body.toString();
  const result = {
    head: headString.replace(/<\/?head>/g, ""),
    body: bodyString.replace(/(<\/?body>)|(<div id="root"><\/div>)/g, "")
  };

  return result;
};

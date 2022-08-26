import fs from "fs";
import { APP_INFO } from "./src/Constant.js";

fs.writeFile("./public/config.json", JSON.stringify(APP_INFO), function (err) {
    if (err) throw err;
    console.log("config.json created!");
});

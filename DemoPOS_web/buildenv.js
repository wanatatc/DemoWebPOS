import { APP_INFO, BASEURL } from "./src/Constant.js";
import { exec } from "child_process";
import fs from "fs";

const environtment = process.env.REACT_APP_ENV;
const homepage = BASEURL[environtment];

fs.writeFile("./public/config.json", JSON.stringify(APP_INFO), function (err) {
    if (err) throw err;
    console.log("config.json created!");
});

console.log(`Start build...`);
console.log(`Environtment : ${environtment}`);
console.log(`Home Page : ${homepage}`);
exec(
    `set "REACT_APP_ENV=${environtment}" && set "BUILD_PATH=${environtment}" && react-scripts build`,
    function (error, stdout, stderr) {
        console.log(stdout, stderr, error);
    }
);
console.log(`React Build at /${environtment}`);
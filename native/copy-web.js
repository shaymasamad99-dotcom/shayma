// Copies the web app (../index.html, ../v, ../icons, manifest) into www/ for the native build.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), www = path.join(__dirname, "www");
fs.rmSync(www, { recursive: true, force: true }); fs.mkdirSync(www, { recursive: true });
const cp = (rel) => { const s = path.join(root, rel), d = path.join(www, rel); if (!fs.existsSync(s)) return; fs.cpSync(s, d, { recursive: true }); };
["index.html", "manifest.webmanifest", "icons", "v", "a"].forEach(cp);
console.log("copied web app to www/");

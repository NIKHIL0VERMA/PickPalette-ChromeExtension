const fs = require('fs-extra');
const zipper = require("zip-local");
const jsonfile = require('jsonfile');
const path = require('path');
const ChromeWebstore = require('chrome-webstore-manager');

const itemId = "EXTENSION_ID"; // TODO Change this after publishing the extension on web store
var buildLocation = path.join(__dirname, "Web2palette");

// read manifest file
var manifest = jsonfile.readFileSync(path.join(buildLocation, "manifest.json"));
function getNewVersion() {
    var ver = parseInt(manifest.version.split('.')[0]);
    ver++;
    return `${ver}.0.0`;
}
var version = getNewVersion();
// replace version
manifest.version = version;
// save manifest file
jsonfile.writeFileSync(path.join(buildLocation, "manifest.json"), manifest);

// create zip
zipper.sync.zip(buildLocation).compress().save(path.join(buildLocation, "build.zip"));
const fileBin = fs.readFileSync(path.join(buildLocation, "build.zip"));

// TODO change the client id and clientSecret
const chromeWebstore = new ChromeWebstore("<CLIENT_ID>", "<CLIENT_SECRET>");
// Get new token with refresh_token
chromeWebstore.getRefreshToken("<REFRESH_TOKEN>").then(function (data) {
    const json = JSON.parse(data)
    const newToken = json.access_token
    chromeWebstore.updateItem(newToken, fileBin, itemId).then((data) => {
        console.log(data);
        chromeWebstore.publishItem(newToken, itemId).then((data) => {
            console.log(data);
        });
    });
 });
 console.log("Deployed version is " + version);
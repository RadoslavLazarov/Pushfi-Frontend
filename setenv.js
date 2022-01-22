const { writeFile } = require("fs");
const { argv } = require("yargs");
// read environment variables from .env file
require("dotenv").config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === "prod";
const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

const processEnv = process.env["APP_ENVIRONMENT"];
let apiUrl;

switch (processEnv) {
  case "DEVELOPMENT":
    apiUrl = "https://localhost:7228/api";
    break;

  case "UAT":
    apiUrl = "https://pushfi.azurewebsites.net/api";
    break;

  case "PRODUCTION":
    apiUrl = "https://pushfi.azurewebsites.net/api";
    break;
}

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   apiUrl: "${apiUrl}",
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});

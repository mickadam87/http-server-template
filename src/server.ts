import https from "https";
import app from "./app";

let options: https.ServerOptions = {
  key: process.env.HTTPS_KEY_PATH,
  cert: process.env.HTTPS_CERT_PATH,
};

export default https.createServer(options, app);

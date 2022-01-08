import https from "https";
import http from "http";
import app from "./refreshApp";

let options: https.ServerOptions = {
  key: process.env.HTTPS_KEY_PATH,
  cert: process.env.HTTPS_CERT_PATH,
};

export default http.createServer(app);

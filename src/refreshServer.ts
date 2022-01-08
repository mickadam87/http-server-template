import https from "https";
import http from "http";
import app from "./refreshApp";

let options: https.ServerOptions = {
  key: process.env.HTTPS_REFRESH_KEY_PATH,
  cert: process.env.HTTPS_REFRESH_CERT_PATH,
};

export const refreshServer = http.createServer(app);

export const refreshSecureServer = https.createServer(options, app);

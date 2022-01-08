import https from "https";
import http from "http";
import app from "./app";

let options: https.ServerOptions = {
  key: process.env.HTTPS_KEY_PATH,
  cert: process.env.HTTPS_CERT_PATH,
};

export const server = http.createServer(app);

export const secureServer = https.createServer(options, app);

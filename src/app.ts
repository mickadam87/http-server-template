import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import auth from "./authentication";

let corsOptions: cors.CorsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
};

let bodyParserOptions: bodyParser.OptionsUrlencoded = {
  extended: false,
};

let app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded(bodyParserOptions));
app.use(auth);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/test", (req, res) => {
  res.sendStatus(200);
});

export default app;

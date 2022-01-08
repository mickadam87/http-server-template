require("dotenv").config();
import server from "./server";
import refreshServer from "./refreshServer";

server.listen(process.env.HTTPS_PORT || 3000, () =>
  console.log("Server is running")
);
refreshServer.listen(process.env.REFRESH_PORT || 4000, () =>
  console.log("Auth is running")
);

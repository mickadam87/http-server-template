import server from "./server";
import refreshServer from "./refreshServer";

server.listen(process.env.HTTPS_PORT);
refreshServer.listen(process.env.REFRESH_PORT);

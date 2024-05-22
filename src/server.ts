import { Server } from "http";
import app from "./app";
import config from "./app/config";

const port = config.port || 4000;
async function main() {
  try {
    const server: Server = app.listen(port, () => {
      console.log(`Server is Running on http://localhost:${port}`);
    });

    // exitHandler
    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.info("Server Closed!");
        });
      }
      process.exit(1);
    };

    // uncaughtException
    process.on("uncaughtException", (error) => {
      console.log(error);
      exitHandler();
    });

    // unhandledRejection
    process.on("unhandledRejection", (error) => {
      console.log(error);
      exitHandler();
    });
  } catch (error) {
    console.log(error);
  }
}
main();

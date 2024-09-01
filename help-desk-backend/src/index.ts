import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import Environment from "./env.js";
import { dbInit } from "./database/controllers/init.js";
import { initRouting } from "./routes/router.js";
import PropellerLogger from "./services/propellerLogger.service.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import AuthService from "./services/auth.service.js";
import { ISocketMessage } from "./interfaces/system/ISocketMessage.js";

const environment = Environment.getInstance();
PropellerLogger.info("Environment initialized with success.");

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "5mb" })); // x-www-form-urlencoded format
app.use(express.json({ limit: "5mb" })); // accepts raw json
app.use(cors()); // set cors policy

// here we create the socket.io server
const socketIoServer = createServer(app);
const io = new Server(socketIoServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const router = express.Router();
await initRouting(environment.config.routing.path, router); // here we initialize the routing system
app.use("", router); // here we setup the router initialized by propeller

// now lets setup socket.io server for live notifications
io.on("connection", (socket) => {
  PropellerLogger.debug("Socket.io client connected.");

  socket.onAny((event: string, msg: ISocketMessage) => {
    if (event.match(/^newAnswer-([0-9]+)$/g)) {
      PropellerLogger.debug("Received answers update message");
      // first we check authorization
      if (msg?.token) {
        // if user's token is valid
        if (AuthService.validate(msg?.token)) {
          // lets propagate the update of the answers to the connected clients (for this event!)
          socket.broadcast.emit(event, { ticketId: msg.ticketId });
        }
      }
    }
  });

  socket.on("disconnect", () => {
    PropellerLogger.debug("Socket.io client disconnected");
  });
});

socketIoServer.listen(environment.server.socketIoPort, () => {
  PropellerLogger.info(
    `Socket.io server is running on port ${environment.server.socketIoPort}`
  );
});

app.all("*", (req, res) =>
  res.status(404).json(`Can't find ${req.originalUrl} on this server!`).send()
);

app.listen(environment.server.port, async () => {
  PropellerLogger.info(`Listening on port ${environment.server.port}`);

  // initialize db connection and seeds basic data.
  await dbInit();
});

export default app;

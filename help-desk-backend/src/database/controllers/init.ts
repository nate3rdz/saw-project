import InternalAPIError from "../../classes/InternalAPIError.js";
import Environment from "../../env.js";
import PropellerLogger from "../../services/propellerLogger.service.js";
import AppDataSource from "../data/data-source.js";
import { dataSynchronizer } from "./data-synchronizer.js";

export async function dbInit(attempts: number = 1) {
  const env = Environment.getInstance();

  if (attempts > env.server.database.maxReconnectionAttempts)
    throw new InternalAPIError(
      "Error while connecting to DB: max connection attempts reached. Now shutting down.",
      500,
      "Error while connecting to DB: max connection attempts reached. Now shutting down."
    );

  AppDataSource.initialize()
    .then(async () => {
      PropellerLogger.info("Successfully connected to DB");

      await dataSynchronizer(); // synchronizes shared data over the database.
    })
    .catch((e) => {
      PropellerLogger.error(
        `Connection to database failed. Retrying in 3 seconds...`
      );
      PropellerLogger.error(e.toString());

      setTimeout(() => {
        attempts++;
        dbInit(attempts);
      }, 3000);
    });
}

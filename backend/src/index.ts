import { App } from './App'
import {createClient, RedisClientType} from "redis";

// instantiate new app and pass it a port as an argument to start with (4200)

let redisClient : RedisClientType | undefined


/**
 * Main function to initialize and start the application.
 * - Connects to the Redis client if not already connected.
 * - Instantiates the `App` class and starts the application.
 *
 * @returns {Promise<void>} A promise that resolves when the application starts successfully.
 */
async function main (): Promise<void> {
  if (redisClient === undefined) {
    // Create and connect the Redis client using the host from environment variables
    redisClient = createClient({ socket: { host: process.env.REDIS_HOST } });
    redisClient.connect().catch(console.error);
  }
  try {
    // Instantiate the App class and start listening for requests
    const app = new App(redisClient);
    await app.listen();
  } catch (e) {
    // Log any errors that occur during initialization
    console.log(e);
  }
}

main().catch(error => { console.error(error) })

import { createApp } from "./app.js";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

async function startServer() {
  await connectDB();
  const app = createApp();

  app.listen(ENV.PORT, () => {
    process.stdout.write(`DentalFlow backend listening on port ${ENV.PORT}\n`);
  });
}

startServer();

import app from './app.js';
import { bootstrapAdmin } from './bootstrapAdmin.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function startServer() {
  await connectDatabase();
  await bootstrapAdmin();

  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

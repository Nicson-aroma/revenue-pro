import bcrypt from 'bcryptjs';
import { connectDatabase } from '../config/db.js';
import { env } from '../config/env.js';
import { Admin } from '../models/Admin.js';

async function seedAdmin() {
  if (!env.adminEmail || !env.adminPassword) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD before seeding the admin account.');
  }

  await connectDatabase();

  const passwordHash = await bcrypt.hash(env.adminPassword, 12);

  await Admin.findOneAndUpdate(
    { email: env.adminEmail },
    { email: env.adminEmail, passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Admin account is ready for ${env.adminEmail}`);
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

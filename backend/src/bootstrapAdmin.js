import bcrypt from 'bcryptjs';
import { env } from './config/env.js';
import { Admin } from './models/Admin.js';

export async function bootstrapAdmin() {
  if (!env.adminEmail || !env.adminPassword) {
    return;
  }

  const passwordHash = await bcrypt.hash(env.adminPassword, 12);

  await Admin.findOneAndUpdate(
    { email: env.adminEmail },
    { email: env.adminEmail, passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

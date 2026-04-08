import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { generateToken } from '../utils/generateToken.js';

export async function loginAdmin(req, res) {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password || '';

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = generateToken({ adminId: admin._id.toString(), email: admin.email });

  res.json({
    token,
    admin: {
      id: admin._id.toString(),
      email: admin.email,
    },
  });
}

export async function getCurrentAdmin(req, res) {
  res.json({ admin: req.admin });
}

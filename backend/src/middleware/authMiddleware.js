import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { Admin } from '../models/Admin.js';

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const admin = await Admin.findById(payload.adminId).select('_id email');

    if (!admin) {
      return res.status(401).json({ message: 'Session is no longer valid.' });
    }

    req.admin = { id: admin._id.toString(), email: admin.email };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

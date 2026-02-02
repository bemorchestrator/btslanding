import bcrypt from 'bcrypt';

export interface User {
  username: string;
  passwordHash: string;
  role: 'admin';
}

// Default admin user with hashed password from environment
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'changeme', 10);

export const defaultAdmin: User = {
  username: 'admin',
  passwordHash: ADMIN_PASSWORD_HASH,
  role: 'admin',
};

// In a real application, this would query a database
export async function findUserByUsername(username: string): Promise<User | null> {
  if (username === defaultAdmin.username) {
    return defaultAdmin;
  }
  return null;
}

export async function verifyPassword(plainPassword: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, passwordHash);
}

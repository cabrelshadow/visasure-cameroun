import Admin from "../models/admin";
import bcrypt from 'bcrypt';

export const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await Admin.create({
    email: 'admin@example.com',
    password: hashedPassword,
  });

  console.log('Admin seeded successfully');
};



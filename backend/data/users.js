import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Jake Peterson',
    email: 'jake@test.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Oliver Smith',
    email: 'oliver@test.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;

import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch users.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

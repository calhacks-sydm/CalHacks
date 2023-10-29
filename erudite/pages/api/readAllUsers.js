import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      // Convert BigInts to strings
      const usersWithBigIntToString = users.map((user) => ({
        ...user,
        id: user.id.toString(),
      }));
      res.status(200).json(usersWithBigIntToString);
    } catch (error) {
      // res.status(400).json({ error: 'Failed to fetch users.' });
      console.log(error)
      res.status(400).json({ error: error });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

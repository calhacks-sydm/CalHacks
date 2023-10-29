// pages/api/getUsers.js
import prisma  from '../../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
        const {
            query: { id },
        } = req;
        
        const user = await prisma.user.findUnique({
            where: {
              id: id,
            },
         });
        
        const usersWithBigIntToString = {
          ...user,
          id: user.id.toString(),
        }
        res.status(200).json(usersWithBigIntToString);
         
        
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch relevant users.' });
    }
  } else {
        res.status(405).end(); // Method Not Allowed
  }
};

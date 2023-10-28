// pages/api/getUsers.js
import prisma  from '../../../prisma/prisma.js'

// const prisma = require('../../../prisma/prisma.js');
export default async (req, res) => {
  if (req.method === 'GET') {
    try {
        // const {
        //     query: { email },
        // } = req;
        const email = 'dzchang@example.com'
        const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
         });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch relevant users.' });
    }
  } else {
        res.status(405).end(); // Method Not Allowed
  }
};

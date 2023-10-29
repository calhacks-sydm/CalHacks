import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
    if (req.method === 'GET') {
      try {
        const deleteUsers = await prisma.solutions.deleteMany({})        
        res.status(200).json({message:"success"});
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to fetch solutions.' });
      }
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  };
  
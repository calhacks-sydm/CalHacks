// pages/api/getUsers.js
import prisma  from '../../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
        const {
            query: { courseId },
        } = req;
    
        const topic = await prisma.topics.findMany({
            where: {
              courseId: courseId,
            },
         });

        
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch relevant topics.' });
    }
  } else {
        res.status(405).end(); // Method Not Allowed
  }
};

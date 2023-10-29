// pages/api/getUsers.js
import prisma  from '../../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
        const {
            query: { topicId },
        } = req;
      
        const question = await prisma.question.findMany({
            where: {
              topicId: topicId,
            },
         });
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch relevant questions.' });
    }
  } else {
        res.status(405).end(); // Method Not Allowed
  }
};

import prisma  from '../../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
        const {
            query: { userId },
        } = req;
      
        const newQuestionsDone = await prisma.questionsDone.findMany({
            where: {
              user: userId,
            },
         });

         
        res.status(200).json(newQuestionsDone);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch relevant questions.' });
    }
  } else {
        res.status(405).end(); // Method Not Allowed
  }
};

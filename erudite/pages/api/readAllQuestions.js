import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const questions = await prisma.questions.findMany();
      const questionsWithBigIntToString = questions.map((question) => ({
        ... question,
        id: question.id.toString(),
        topic_id: question.topic_id.toString(),
      }));
      res.status(200).json(questionsWithBigIntToString);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch questions.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

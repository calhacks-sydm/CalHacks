import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const solutions = await prisma.solutions.findMany();
      const solutionsWithBigIntToString = solutions.map((solution) => ({
        ... solution,
        id: solution.id.toString(),
        question_id: solution.question_id.toString(),
      }));
      console.log(solutionsWithBigIntToString)
      res.status(200).json(solutionsWithBigIntToString);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to fetch solutions.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const subproblems = await prisma.subproblems.findMany();
      const subproblemsWithBigIntToString = subproblems.map((subproblem) => ({
        ... subproblem,
        id: subproblem.id.toString(),
        count: subproblem.count.toString(),
        question_id: subproblem.question_id.toString(),
      }));
      console.log(subproblemsWithBigIntToString)
      res.status(200).json(subproblemsWithBigIntToString);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to fetch solutions.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

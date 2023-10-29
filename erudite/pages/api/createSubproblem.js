import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, count, question_id, title, description } = req.body;

    try {
      const newSubproblem = await prisma.subproblems.create({
        data: {
            id, 
            count, 
            question_id, 
            title, 
            description
        },
      });
      const newSubproblemWithBigIntToString = {
        ...newSubproblem,
        id: newSubproblem.id.toString(),
        count: newSubproblem.id.toString(),
        question_id: newSubproblem.question_id.toString(),
      }
      console.log(newSubproblemWithBigIntToString)
      res.status(200).json(newSubproblemWithBigIntToString);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to create subproblem.' }); // User with same email already in the database
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }

};

  
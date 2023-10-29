import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, question_id, solution} = req.body;

    try {
      const newSolution = await prisma.solutions.create({
        data: {
            id: id, 
            question_id: question_id, 
            solution: solution, 
            
        },
      });

      res.status(200).json(newSolution);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create topic.' }); // User with same email already in the database
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

  
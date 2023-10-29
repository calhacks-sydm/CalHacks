import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, count, question_id, title, description } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
            id, 
            count, 
            question_id, 
            title, 
            description
        },
      });

      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user.' }); // User with same email already in the database
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

  
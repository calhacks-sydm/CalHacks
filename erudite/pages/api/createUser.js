import { prisma } from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { first_name, last_name, email, password } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password, 
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

  
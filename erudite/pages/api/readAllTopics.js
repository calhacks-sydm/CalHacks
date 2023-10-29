import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const topics = await prisma.topic.findMany();
      res.status(200).json(topics);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch topics.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

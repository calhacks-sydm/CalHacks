import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const topics = await prisma.topics.findMany();
      const topicsWithBigIntToString = topics.map((topic) => ({
        ...topic,
        id: topic.id.toString(), 
        course_id: topic.course_id.toString()
      }));
      console.log(topicsWithBigIntToString);
      res.status(200).json(topicsWithBigIntToString);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Failed to fetch topics.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

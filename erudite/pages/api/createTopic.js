import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, topic, course_id} = req.body;

    try {
      const newTopic = await prisma.topic.create({
        data: {
          id:id, 
          topic_name: topic_name, 
          course_id: course_id,
        },
      });



      res.status(200).json(newTopic);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create topic.' }); // User with same email already in the database
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

  
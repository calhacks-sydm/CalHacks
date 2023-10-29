import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, questions, course_id} = req.body;

    try {
      const newQuestions = await prisma.questions.create({
        data: {
          id:id, 
          questions_name: questions_name, 
          course_id: course_id,
        },
      });

      res.status(200).json(newQuestions);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create questions.' }); // User with same email already in the database
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

  
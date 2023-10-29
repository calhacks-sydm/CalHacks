import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { user_id, question_id, score } = req.body;

    try {
      const newQuestionDone = await prisma.questionDone.create({
        data: {
            user_id: user_id, 
            question_id: question_id, 
            score: score
        },
      });

      res.status(200).json(newQuestionDone);
    } catch (error) {
      res.status(400).json({ error: 'Failed to complete question.' }); // User with same email already in the database
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

  
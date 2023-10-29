import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, question, topic_id, hint} = req.body;

    try {
      const newQuestions = await prisma.questions.create({
        data: {
          id:id, 
          question: question, 
          topic_id: topic_id,
          hint: hint
        },
      });
      
      const newQuestionsWithBigIntToString = {
        ...newQuestions, 
        id: newQuestions.id.toString(), 
        topic_id: newQuestions.topic_id.toString(),
      }
      console.log(newQuestionsWithBigIntToString);
      res.status(200).json(newQuestionsWithBigIntToString);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to create questions.' }); // User with same email already in the database
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

  
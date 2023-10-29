import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method == 'GET') {
    try {
      var questions = await prisma.questions.findMany();
      var questionssWithBigIntToString = questions.map((question) => ({
          ...question, 
          id: question.id.toString(),
        
      }));
      res.status(200).json(questionssWithBigIntToString);
    } catch (error) {
      
      res.status(400).json({ error: "unable to return all questions" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

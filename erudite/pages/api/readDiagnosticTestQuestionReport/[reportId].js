import prisma  from '../../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
        const {
            query: { reportId },
        } = req;
      
        const diagnosticQuestionsDone = await prisma.diagnosticQuestionsDone.findMany({
          where: {
            report_id: reportId,
            },
        });

        const diagnosticQuestionsDoneWithBigIntToString = users.map((question) => ({
          ...question,
          report_id: question.report_id.toString,
          question_id: question.question_id.toString,
          user_id: question.user_id.toString, 
        }));

        res.status(200).json(diagnosticQuestionsDoneWithBigIntToString);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch relevant questions.' });
    }
  } else {
        res.status(405).end(); // Method Not Allowed
  }
};

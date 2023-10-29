import prisma from "../../prisma/prisma.js"

export default async (req, res) => {
    if (req.method === 'POST') {
        const { report_id, question_id, user_id, user_input } = req.body;
        
        try {
            const newCourse = await prisma.diagnosticQuestionsDone.create({
            data: {
                report_id: report_id,
                question_id: question_id,
                user_id: user_id,
                user_input: user_input,
                },
            });
            const newCourseWithBigIntToString = {
                ...newCourse,
                report_id: newCourse.report_id.toString(),
                question_id: newCourse.question_id.toString(),
                user_id: newCourse.user_id.toString(),
            }
            res.status(200).json(newCourseWithBigIntToString);
        } catch (error) {
            res.status(400).json({ error: error}); // User with same email already in the database
        }

    } else {
        res.status(405).end(); // Method Not Allowed
    }
};

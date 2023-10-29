import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') { 
    try {
      // get 12 random topics 
      // select random question from each topic 

      function getRandomEntriesFromObject(obj, numberOfEntriesToSelect) {
        const entriesArray = Object.entries(obj); 
        const shuffledArray = entriesArray.slice(); 
      
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          // Shuffle the array using the Fisher-Yates algorithm
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        
        randomEntries = shuffledArray.slice(0, numberOfEntriesToSelect);
        return Object.fromEntries(randomEntries);
      }

      const topics = await prisma.topic.findMany();
      const topicsWithBigIntToString = topics.map((topic) => ({
        ...topic, 
        id: topic.id.ToString(),
        course_id: topic.course_id.ToString(),
      }));
      chosenTopics = getRandomEntriesFromObject(topicsWithBigIntToString, 12)

      selectedQuestions = []
      for (let i = 0; i < 12; i++) {
        var currentTopic = chosenTopics[i]
        const questions = await prisma.Questions.findMany({
            where: {
                topic_id: currentTopic.id 
            }
        });

        topicChosenQuestion = getRandomEntriesFromObject(questions, 12)
        topicChosenQuestionWithBigIntToString = {
            ...topicChosenQuestion,
            id: topicChosenQuestion.id.ToString(),
            topic_name: currentTopic.topic_name,
            topic_id: topicChosenQuestion.topic_id.ToString(),
        }
        selectedQuestions.push(topicChosenQuestionWithBigIntToString)
      }

      function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
      
        return result;
      }

      res.status(200).json({selected_questions: selectedQuestions, report_id: generateRandomString(10)});
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch questions.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method === 'GET') { 
    try {
      // get 12 random topics 
      // select random question from each topic 

      function getRandomEntriesFromObject(arr, n) {
        if (n <= 0 || n > arr.length) {
          throw new Error('Invalid number of items to select');
        }
      
        const copy = [...arr];
        const result = [];
      
        for (let i = 0; i < n; i++) {
          // Generate a random index within the remaining items
          const randomIndex = Math.floor(Math.random() * copy.length);
      
          // Remove the selected item from the copy and add it to the result
          const selectedItem = copy.splice(randomIndex, 1)[0];
          result.push(selectedItem);
        }
      
        return result;
      }


      
      const topics = await prisma.topics.findMany();
      const topicsWithBigIntToString = topics.map((topic) => ({
        ...topic,
        id: topic.id.toString(), 
        course_id: topic.course_id.toString()
      }));

      var questionsArr = []
      for (let i = 0; i < topicsWithBigIntToString.length; i++) {
        var currentTopic = topics[i]
        
        const questions = await prisma.Questions.findMany({
            where: {
                topic_id: currentTopic.id
            }
        });
        

        // var topicChosenQuestions = getRandomEntriesFromObject(questions, 3)
        
        var topicChosenQuestionWithBigIntToString = questions.map((question) => ({
            ...question,
            topic_name: currentTopic.topic_name,
            id: question.id.toString(),
            topic_id: question.topic_id.toString(),
        }));
        questionsArr.push(topicChosenQuestionWithBigIntToString[0])
      }
      

      var ChosenQuestions = getRandomEntriesFromObject(questionsArr, 8)

      function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
      
        return result;
      }

      res.status(200).json({selected_questions: ChosenQuestions, report_id: generateRandomString(10)});

     
      // chosenTopics = getRandomEntriesFromObject(topicsWithBigIntToString, 12)
      
    
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch questions.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

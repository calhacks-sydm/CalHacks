import prisma from '../../prisma/prisma.js'

export default async (req, res) => {
  if (req.method == 'POST') {
    const { question, answer, userInput } = req.body;
    try {
        
        const url = "https://calhacks.ranchu2000.repl.co/predict"
        
        const data =  {
            question: question, 
            answer: answer, 
            userInput: userInput,
        }

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Unable to fetch results');
            }
            return response.text(); // Extract the text response
          })
          .then(textResponse => {
            console.log(textResponse); // Access the text response here
            // Do something with textResponse
            res.status(200).send(textResponse); // Send the text response to the client
          })
          .catch(error => {
            console.error('Error:', error);
            res.status(400).json({ 'error': error.message });
          });
        
          
    } catch (error) {
      
      res.status(400).json({ error: "unable to return all courses" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};



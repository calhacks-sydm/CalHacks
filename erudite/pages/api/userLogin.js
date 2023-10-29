import prisma from '../../prisma/prisma.js'

export default async (req, res) => {


    if (req.method === 'POST') {
        
        const { email, password } = req.body;
        try {
          const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            }
          });
    
          res.status(200).json({message: 'Login successful', auth: 'True'});
        } catch (error) {
          res.status(400).json({ error: 'Failed to create user.' }); // User with same email already in the database
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
}
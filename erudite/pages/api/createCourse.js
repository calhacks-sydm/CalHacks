import prisma from "../../prisma/prisma.js"
// const prisma = require("../../prisma/prisma.js")

export default async (req, res) => {
    if (req.method === 'POST') {
      const {course_name} = req.body;
      console.log(course_name);
      try {
        const newCourse = await prisma.courseInfo.create({
          data: {
            course_name: course_name, 
          },
      });
  
        res.status(200).json(newCourse);
      } catch (error) {
        res.status(400).json({ error: error}); // User with same email already in the database
      }
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  };

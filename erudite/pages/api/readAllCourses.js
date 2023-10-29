import prisma from '../../prisma/prisma.js'
// const {prisma} =  require('../../prisma/prisma.js')

// async function readAllCourses(req, res){
export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      var courses = await prisma.courseInfo.findMany();
      var coursesWithBigIntToString = courses.map((course) => ({
          ...course, 
          id: course.id.toString(),
        
      }));
      res.status(200).json(coursesWithBigIntToString);
    } catch (error) {
      
      res.status(400).json({ error: "unable to return all courses" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

// module.exports = {readAllCourses:readAllCourses}

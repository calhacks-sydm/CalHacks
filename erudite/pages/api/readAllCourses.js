import prisma from '../../prisma/prisma.js'
// const {prisma} =  require('../../prisma/prisma.js')

// async function readAllCourses(req, res){
export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      var courseInfo = await prisma.courseInfo.findMany();
      courseInfo = Number(courseInfo)
      res.status(200).json(courseInfo.toString());
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: error });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

// module.exports = {readAllCourses:readAllCourses}

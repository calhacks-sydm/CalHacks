"use client"

import { useEffect, useState } from "react"
import DiagnoticTest from "@/components/DiagnosticTest"
import { Button } from "@/components/ui/button"

interface ICourse {
    id: number
    course_name: string
}

export default function GenerateTest() {
    // Fetch courses from database
    const getCourse = async () => {
        const res = await fetch('/api/readAllCourses')
        const data = await res.json()
        console.log(data)
        return data
    }
    const [courses, setCourses] = useState<ICourse[]>([])

    useEffect(() => {
        getCourse().then((data) => setCourses(data))
    }, [])
    
    const [course, setCourse] = useState("")
    const [generated, setGenerated] = useState(false)
    

    const handleCourseSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        // Handle getting questions from database here
        setCourse(event.target.value)
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle button press here
        setGenerated(true)
    };

    return (
        <div className="flex my-10 mx-24 justify-center">
            

            { generated ? <DiagnoticTest course={course} /> : 
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center">Select the course you wish to review:</h1>
                <select placeholder="select course" value={course} onChange={handleCourseSelect}
                    className="w-40 my-4 appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                >
                    {courses.map((course) => (
                        <option key={course.id} value={course.course_name}>{course.course_name}</option>
                    ))}
                </select>
                <Button className='text-white w-40 bg-green-500 hover:bg-green-400' onClick={(handleSubmit) => setGenerated(true)}>Generate Test</Button>  
            </div>}
        </div>
    )
}
"use client"

import { useState } from "react"
import TopicalPractise from "@/components/TopicalPractise" 
import { Button } from "@/components/ui/button"

export default function GenerateTopical() {
    // Fetch courses from database
    const topics = [{
        'id': 1,
        'topic_name': 'Dynamic Programming',
    },
    {
        'id': 2,
        'topic_name': 'Fast Fourier Transform',
    }]
    const [topic, setTopic] = useState("")
    const [generated, setGenerated] = useState(false)
    

    const handleCourseSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        // Handle getting questions from database here
        setTopic(event.target.value)
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle button press here
        setGenerated(true)
    };

    return (
        <div className="flex my-10 mx-24 justify-center">
            <TopicalPractise topic={topic}></TopicalPractise>
        </div>
    )
}
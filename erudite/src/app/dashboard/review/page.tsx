'use client';

import { useState, useContext } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { LoginContext } from "@/app/login/page"

interface IReviewTest {
    question_no: number
    question: string
    user_answer: string
    solution: string
    feedback: string
}

const ReviewQuestion: React.FC<IReviewTest> = (props) => {
    return (
        <div>
            <ScrollArea className="h-[150px] border w-full p-4 my-2">
                <p className='text-lg'>{props.question}</p>
            </ScrollArea>
            <div className="grid grid-cols-2 gap-4">
                <ScrollArea className="h-[300px] border w-full p-4">
                    <p className="font-bold">Your Answer:</p>
                    {props.user_answer}
                </ScrollArea>
                <ScrollArea className="h-[300px] border w-full p-4">
                    <p className="font-bold">Solution:</p>
                    {props.solution}
                </ScrollArea>
            </div> 
            <ScrollArea className="h-[150px] border w-full p-4 my-2 ">
                <p className="font-bold">Feedback:</p>
                {props.feedback}
            </ScrollArea> 
        </div>
    )
}


export default function ReviewTest() {
    let {email, password} = useContext(LoginContext);
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [data, setData] = useState<IReviewTest[]>([
        {
            question_no: 1,
            question: "What is the capital of France?",
            user_answer: "Paris",
            solution: "Paris",
            feedback: "Great job!"
        },
        {
            question_no: 2,
            question: "What is the largest planet in our solar system?",
            user_answer: "Earth",
            solution: "Jupiter",
            feedback: "Incorrect. The largest planet in our solar system is Jupiter."
        },
        {
            question_no: 3,
            question: "What is the boiling point of water?",
            user_answer: "100 degrees Celsius",
            solution: "100 degrees Celsius",
            feedback: "Correct!"
        }
    ])
    const fetchReport = async () => {
        // Fetch Reports

    }    

    return (
        <div className="flex">
            <div className="flex-col items-center w-full px-20">
                <h1 className="text-4xl font-bold mt-4 ">Diagnostic Test Review: <span className="font-normal">Question {data[currentQuestion].question_no}</span></h1>
                <ReviewQuestion 
                    question_no={data[currentQuestion].question_no}
                    question={data[currentQuestion].question}
                    user_answer={data[currentQuestion].user_answer}
                    solution={data[currentQuestion].solution}
                    feedback={data[currentQuestion].feedback}
                />
                <div className='flex flex-row justify-between'>
                    <Button onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion == 0 ? true:false} className={`w-36 bg-green-600 hover:bg-green-400 ${currentQuestion == 0 ? "disabled:bg-slate-400":null}`}>Previous Question</Button>
                    <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion == data.length-1 ? true:false} className={`w-36 bg-green-600 hover:bg-green-400 ${currentQuestion == data.length-1 ? "disabled:bg-slate-400":null}`}>Next Question</Button>
                </div>
            </div>
        </div>
    )


}
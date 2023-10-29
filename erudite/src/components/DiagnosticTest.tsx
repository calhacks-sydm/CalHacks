'use client'

import React, { useState, useContext, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
// import { LoginContext } from "@/app/login/page"

interface DiagnosticTestProps {
    course: string;
}

interface DiagnosticQuestionProps {
    // email: string;
    question_id: number;
    topic: string;
    question_description: string;
    currentQuestion: number;
    setQuestion: React.Dispatch<React.SetStateAction<number>>;
    totalQuestions: number;
    report_id: number;
}

const DiagnosticQuestions: React.FC<DiagnosticQuestionProps> = (props) => { 
    const router = useRouter();
    const [userAnswer, setUserAnswer] = useState("")
    const postAnswer = async ({req}:{req: Request, body: any}) => {
        const res = await fetch('/api/createDiagnosticTestQuestionDoneEntry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                report_id: props.report_id,
                question_id: props.question_id,
                user_input: userAnswer,
                user_id: 912462614630957057
            })})
        console.log(JSON.stringify(res))
    }

    const handleUserAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setUserAnswer(event.target.value)
    }
    
    const handleSubmitAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // SEND USER ANSWER TO DATABASE HERE, if no more questions, redirect to generate value
        console.log(userAnswer)
        postAnswer({req: new Request('/api/createDiagnosticTestQuestionDoneEntry'), body: {report_id: props.report_id, question_id: props.question_id, user_input: userAnswer, user_id: 912462614630957057}})
        {props.currentQuestion == props.totalQuestions-1 ? router.push("/dashboard/review") : props.setQuestion(props.currentQuestion + 1)}
    }
    
    return (
        <div className='w-2/3 self-center'>
            <h1 className='text-3xl font-bold my-4'>Question {props.question_id}</h1>
            <div className='text-xl font-bold mb-2'>{props.topic}</div>
            <div className='text-lg my-2'>{props.question_description}</div>
            
            <Textarea className='w-full my-4' placeholder='Enter your answer here' defaultValue="" value={userAnswer} onChange={handleUserAnswer}/>
            <Button className="w-54 bg-green-600 hover:bg-green-400" onClick={handleSubmitAnswer}>{props.currentQuestion == props.totalQuestions-1 ? "Submit Test": "Submit"}</Button> 
            
        </div>
    )
} 

interface IQuestion {
    question_id: number
    topic_name: string
    question: string
    hint: string
}

interface IDiagTest {
    selected_questions: IQuestion[]
    report_id: number
}

export default function DiagnosticTest({course}: DiagnosticTestProps): JSX.Element {
    // Access the course property of the course object
    // let {email, password} = useContext(LoginContext);
    const courseName = course;
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [test, setTest] = useState<IDiagTest>({report_id: 0, selected_questions: [
        {
            question_id: 0,
            topic_name: "",
            question: "",
            hint: ""
        }
    ]})

    const generateTest = async () => {
        const res = await fetch('/api/generateDiagnosticTest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
        const data = await res.json()
        if (res.status == 200) {
            console.log(data)
        } else {
            console.log("error")
        }
        return data
    }
    useEffect(() => {
        generateTest().then((data) => setTest(data))
    }, [])


    // const questions = [{
    //     'question_id': 1,
    //     'topic': 'Sorting Algorithms',
    //     'question_description': 'What is the time complexity of insertion sort?',
    //     'hint': 'Think about the number of times you need to iterate through the array',
    // },
    // {
    //     'question_id': 2,
    //     'topic': 'Sorting Algorithms',
    //     'question_description': 'For each part, find the asymptotic order of growth of T; that is, find a function g such that T(n) = Θ(g(n)). Show your reasoning and do not directly apply any master theorems. In all subparts, you may ignore any issues arising from whether a number is an integer.',
    //     'question_subproblems': ['(a) T(n) = 3T(n/4) + 10n',],
    //     'hint': 'Think about the number of times you need to iterate through the array',
    // }]

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between mx-56'>
                <Button onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion == 0 ? true:false} className={`w-36 bg-green-600 hover:bg-green-400 ${currentQuestion == 0 ? "disabled:bg-slate-400":null}`}>Previous Question</Button>
                <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion == test.selected_questions.length-1 ? true:false} className={`w-36 bg-green-600 hover:bg-green-400 ${currentQuestion == test.selected_questions.length-1 ? "disabled:bg-slate-400":null}`}>Next Question</Button>
            </div>
            {test.selected_questions.map((question, index) => (
                index == currentQuestion ? 
                <DiagnosticQuestions key={index} 
                // email={email}
                question_id={question.question_id} 
                topic={question.topic_name}
                question_description={question.question} 
                currentQuestion={currentQuestion}
                setQuestion={setCurrentQuestion} 
                totalQuestions={test.selected_questions.length}
                report_id={test.report_id}
                /> : null
            ))}
            
        </div>
    );
}

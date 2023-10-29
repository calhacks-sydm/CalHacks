'use client'

import React, { useState, useContext } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { LoginContext } from "@/app/login/page"

interface TopicalPractiseProps {
    topic: string;
}

interface TopicalPractiseQuestionsProps {
    question_id: number;
    topic: string;
    question_description: string;
    hint: string;
    question_subproblems: string[] | null;
    solution: string;
    currentQuestion: number;
    setQuestion: React.Dispatch<React.SetStateAction<number>>;
    totalQuestions: number;
}

const TopicalPractiseQuestion: React.FC<TopicalPractiseQuestionsProps> = (props) => { 
    const [showHint, setShowHint] = useState(false)
    const [showDecompose, setShowDecompose] = useState(false)
    const [showSolution, setShowSolution] = useState(false)
    const [userAnswer, setUserAnswer] = useState("")
    const router = useRouter();

    const handleUserAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setUserAnswer(event.target.value)
    }
    
    const handleSubmitAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // SEND USER ANSWER TO DATABASE HERE, if no more questions, redirect to generate value
        console.log(userAnswer)
        
        {props.currentQuestion == props.totalQuestions-1 ? 
            null // router.push("/dashboard/review") 
            : props.setQuestion(props.currentQuestion + 1)}
    }
    
    return (
        <div className='w-2/3 self-center'>
            <h1 className='text-3xl font-bold my-4'>Question {props.question_id}</h1>
            <div className='text-xl font-bold mb-2'>{props.topic}</div>
            <div className='text-lg my-2'>{props.question_description}</div>
            {showHint == true ? <div className='text-lg my-2'>Hint: {props.hint}</div>: null}
            {showDecompose == true ? <div className=' '>{props.question_subproblems ? 
                <div>
                    <div className='text-lg font-bold'>Decomposed question parts:</div>
                    {props.question_subproblems.map((subproblem, index) => (
                        <div className='text-lg mt-2' key={index}>{subproblem}</div>
                    ))}
                </div>
                : null
            }</div> :
            null}
            {showSolution == true ? <div className='text-lg my-2'>Solution: {props.solution}</div>: null}
            <div className='flex'>
                <Button className="w-54 bg-green-400 mt-4 mr-2 hover:bg-green-200 " onClick={() => setShowHint(!showHint)}>Show Hint</Button> 
                <Button className="w-54 bg-green-500 mt-4 mr-2 hover:bg-green-300 " onClick={() => setShowDecompose(!showDecompose)}>Decompose Question</Button> 
                <Button className="w-54 bg-green-600 mt-4 mr-2 hover:bg-green-400 " onClick={() => setShowSolution(!showSolution)}>Show Solution</Button> 
            </div>
            <Textarea className='w-full my-4' placeholder='Enter your answer here' defaultValue="" value={userAnswer} onChange={handleUserAnswer}/>
            <Button className="w-54 bg-green-600 hover:bg-green-400" onClick={handleSubmitAnswer}>{props.currentQuestion == props.totalQuestions-1 ? "Submit Answers": "Save Answer"}</Button> 
            
        </div>
    )
} 



export default function TopicalPractise({topic}: TopicalPractiseProps): JSX.Element {
    // Access the course property of the course object
    const topicName = topic;
    let {email, password} = useContext(LoginContext);
    const [currentQuestion, setCurrentQuestion] = useState(0)
    // const getQuestions = async () => {
    //     const response = await fetch();
    // }

    const questions = [{
        'question_id': 1,
        'topic': 'Recurrence Relation',
        'question_description': 'For each part, find the asymptotc growth of T; that is find a function such that T(n) = Theta(g(n)). Show your reasoning and do not directly apply any master thoerems. In all subparts, you nay ignore any issues arising from whether a number is an integer. (a) T(]n) = 3/4T(n/4) ',
        'hint': 'Think about XXXXX',
        'subproblems': ['thishowitgoes'],
        'solution': 'Lorem ipsum lores est istes maitum nox'
    },
    {
        'question_id': 2,
        'topic': 'Sorting Algorithms',
        'question_description': 'For each part, find the asymptotic order of growth of T; that is, find a function g such that T(n) = Θ(g(n)). Show your reasoning and do not directly apply any master theorems. In all subparts, you may ignore any issues arising from whether a number is an integer.',
        'hint': 'Think about the number of times you need to iterate through the array',
        'question_subproblems': ['(a) T(n) = 3T(n/4) + 10n',],
        'solution': 'Lorem ipsum lores est istes maitum nox'
    }]

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between mx-56'>
                <Button onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion == 0 ? true:false} className={`w-36 bg-green-600 hover:bg-green-400 ${currentQuestion == 0 ? "disabled:bg-slate-400":null}`}>Previous Question</Button>
                <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion == questions.length-1 ? true:false} className={`w-36 bg-green-600 hover:bg-green-400 ${currentQuestion == questions.length-1 ? "disabled:bg-slate-400":null}`}>Next Question</Button>
            </div>
            <h1 className='text-3xl font-bold my-2 text-center'>Topic: {topicName}</h1>
            {questions.map((question, index) => (
                index == currentQuestion ? 
                <TopicalPractiseQuestion key={index} 
                question_id={question.question_id} 
                topic={question.topic}
                question_description={question.question_description} 
                hint={question.hint}
                solution={question.solution}
                question_subproblems={question.question_subproblems? question.question_subproblems : null}
                currentQuestion={currentQuestion}
                setQuestion={setCurrentQuestion} 
                totalQuestions={questions.length}
                /> : null
            ))}
            
        </div>
    );
}

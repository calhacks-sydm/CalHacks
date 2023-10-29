
import React from 'react';

interface DiagnosticTestProps {
    course: string;
}



export default function DiagnosticTest({course}: DiagnosticTestProps): JSX.Element {
    // Access the course property of the course object
    const courseName = course;


    return <div>{courseName}</div>;
}

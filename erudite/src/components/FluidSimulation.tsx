"use client";

import React, { useEffect, useRef } from 'react';

const FluidSimulation: React.FC = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const script = document.createElement('script');
            script.src = "/js/script.js";
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [canvasRef]);

    return (
        <canvas id="canvas" ref={canvasRef} className="w-screen h-screen"></canvas>
    );
};

export default FluidSimulation;
import React from 'react';

type ProgressBarProps = {
  progress: number;
};

export function ProgressBar (progress: ProgressBarProps) {
    return (
      <div className="flex items-center relative pt-1">
        <div className="flex items-center justify-between">
          <div className="text-right pr-2">
            <span className="text-[28px] font-semibold inline-block text-green-500 drop-shadow-sm">
                {progress.progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-4 text-xs flex-grow rounded-full bg-white">
          <div style={{ width: `${progress.progress}%` }} className="h-4 rounded-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
        </div>
      </div>
    );
  }

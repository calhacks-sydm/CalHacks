import { ProgressBar } from "./ProgressBar";

type ProgressBarProps = {
    progress: number;
    topic: string
  };

export default function TopicBox(progress: ProgressBarProps) {
  return (
    <div className="bg-gray-200 w-full flex justify-between items-center p-4">
        <div className="font-medium text-[32px]">{progress.topic}</div>
        <div className="w-5/12"><ProgressBar progress={progress.progress}/></div>
    </div>
  );
}

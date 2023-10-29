import { ProgressBar } from "./ProgressBar";

type ProgressBarProps = {
    progress: number;
  };

export default function TopicBox(progress: ProgressBarProps) {
  return (
    <div className="bg-gray-200 w-full flex justify-between items-center p-4">
        <div className="font-medium text-[32px]">Divide and Conquer</div>
        <div className="w-5/12"><ProgressBar progress={progress.progress}/></div>
    </div>
  );
}

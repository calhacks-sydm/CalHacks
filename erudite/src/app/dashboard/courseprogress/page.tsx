import { Button } from "@/components/ui/button";
import Link from "next/link";
import TopicBox from "@/components/TopicBox";
import TopicalPractise from "@/components/TopicalPractise";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/SelectComponent";

export default function CourseProgress() {
  return (
    <main className="flex flex-col w-full min-h-screen gap-16 px-44">
      <h1 className="text-6xl font-bold"> Course Progress </h1>
      {/* Course Selection */}
      <div className="text-4xl text-gray-800 font-medium">
        Course Selection
      </div>
      <div className="flex flex-col gap-y-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Course" />
          </SelectTrigger>
          <SelectContent>
            {/* TODO if got vibes: change it to dynamic course updates */}
            <SelectItem value="cs170">CS170</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Link href="/dashboard/review">
            <Button
              variant="default"
              size="lg"
              className="bg-green-500 rounded-full"
            >
              View Test Report
            </Button>
          </Link>
          <Link href="/dashboard/diagnostic">
            <Button
              variant="default"
              size="lg"
              className="bg-gray-200 rounded-full text-black"
            >
              Retake Diagnostic Test
            </Button>
          </Link>
        </div>
      </div>
      {/* Topics to work on */}
      <div className="flex flex-col gap-y-4">
        <h2 className="font-semibold text-[40px]">Topics to work on</h2>
        {/* Component */}
        {/* Sanitize input before passing in; round the number */}
        <Link href="/dashboard/topicalreview">
          <TopicBox progress={70} topic="Dynamic Programming"></TopicBox>
        </Link>
        <TopicBox progress={50} topic="Greedy"></TopicBox>
        <TopicBox progress={20} topic="Multiplicative Weights Update"></TopicBox>
      </div>
    </main>
  );
}

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface Skill {
  skill: string;
  score: number;
}

interface SkillsBreakdownProps {
  skillScores: Skill[];
  getScoreColor: (score: number) => string;
}

const SkillsBreakdown: React.FC<SkillsBreakdownProps> = ({ skillScores, getScoreColor }) => (
  <Card className="lg:col-span-2">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <Target className="h-5 w-5" />
        Skills Breakdown
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {skillScores.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium  text-white">{skill.skill}</span>
              <span className={`font-bold ${getScoreColor(skill.score)}`}>
                {skill.score}%
              </span>
            </div>
            <Progress value={skill.score} className="h-2" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default SkillsBreakdown;

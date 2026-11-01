import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  skill: string;
  score: number;
}

interface SkillsBreakdownProps {
  skillScores: Skill[];
  getScoreColor: (score: number) => string;
}

const SkillsBreakdown: React.FC<SkillsBreakdownProps> = ({ skillScores, getScoreColor }) => (
  <Card className={cn('card-elevated')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
          <Target className="h-5 w-5" />
        </div>
        Skills Breakdown
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-4">
        {skillScores.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-700">{skill.skill}</span>
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

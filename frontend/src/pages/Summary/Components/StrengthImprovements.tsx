import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrengthsAndImprovementsProps {
  strengths: string[];
  improvements: string[];
}

const StrengthsAndImprovements: React.FC<StrengthsAndImprovementsProps> = ({ strengths, improvements }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <Card className={cn('card-elevated')}>
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-teal-700">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-teal-600" />
          </div>
          Strengths
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {strengths.length > 0 ? (
            strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-slate-800">{strength}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-400 italic">No strengths identified yet.</p>
          )}
        </div>
      </CardContent>
    </Card>

    <Card className={cn('card-elevated')}>
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-amber-700">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </div>
          Areas for Improvement
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {improvements.map((improvement, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-slate-800">{improvement}</p>
            </div>
          ))}
          {improvements.length === 0 && (
            <p className="text-slate-400 italic">No improvements identified yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default StrengthsAndImprovements;

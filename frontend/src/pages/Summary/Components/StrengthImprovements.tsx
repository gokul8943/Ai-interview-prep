import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

interface StrengthsAndImprovementsProps {
  strengths: string[];
  improvements: string[];
}

const StrengthsAndImprovements: React.FC<StrengthsAndImprovementsProps> = ({ strengths, improvements }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-500">
          <CheckCircle className="h-5 w-5" />
          Strengths
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {strengths.map((strength, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white">{strength}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-500">
          <AlertCircle className="h-5 w-5" />
          Areas for Improvement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {improvements.map((improvement, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white">{improvement}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default StrengthsAndImprovements;

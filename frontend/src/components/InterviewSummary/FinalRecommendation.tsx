import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface FinalRecommendationProps {
  name: string;
  position: string;
}

const FinalRecommendation: React.FC<FinalRecommendationProps> = ({ name, position }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Star className="h-5 w-5" />
        Final Recommendation
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-gray-800 leading-relaxed">
          <strong>Recommendation:</strong> {name} demonstrates strong technical
          capabilities and shows good potential for the {position} role. While
          there are areas for improvement in communication and leadership, the
          candidate's technical foundation and problem-solving abilities make
          them a viable candidate. Consider for next round with focus on cultural
          fit assessment and leadership potential evaluation.
        </p>
      </div>
    </CardContent>
  </Card>
);

export default FinalRecommendation;

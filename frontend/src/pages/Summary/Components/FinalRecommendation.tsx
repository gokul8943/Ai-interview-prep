import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface FinalRecommendationProps {
  recommendationText: string;
}

const FinalRecommendation: React.FC<FinalRecommendationProps> = ({recommendationText }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <Star className="h-5 w-5" />
        Final Recommendation
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className=" border border-blue-200 rounded-lg p-4">
        <p className="text-white leading-relaxed">
          <strong>Recommendation:</strong> {recommendationText}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default FinalRecommendation;

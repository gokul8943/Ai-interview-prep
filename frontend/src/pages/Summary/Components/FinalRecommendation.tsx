import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinalRecommendationProps {
  recommendationText: string;
}

const FinalRecommendation: React.FC<FinalRecommendationProps> = ({ recommendationText }) => (
  <Card className={cn('card-elevated')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <Star className="h-5 w-5" />
        </div>
        Final Recommendation
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <p className="text-slate-800 leading-relaxed">
          {recommendationText}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default FinalRecommendation;

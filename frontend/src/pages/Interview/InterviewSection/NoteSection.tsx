import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, FileText, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textArea";
import { cn } from '@/lib/utils';

interface Props {
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  saveAnswer: () => void;
  currentAnswer?: string;
}

const NotesSection: React.FC<Props> = ({ notes, setNotes, saveAnswer, currentAnswer }) => (
  <Card className={cn('card-elevated')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FileText className="w-4 h-4" />
        </div>
        Answer
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your answer or notes here..."
        className="min-h-32 resize-none"
      />
      <div className="flex gap-2">
        <Button
          onClick={saveAnswer}
          disabled={!notes.trim()}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Answer
        </Button>
        <Button
          onClick={() => setNotes("")}
          variant="outline"
          disabled={!notes.trim()}
        >
          <X className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      {currentAnswer && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-slate-800">
            <strong className="text-slate-900">Saved Answer:</strong> {currentAnswer}
          </AlertDescription>
        </Alert>
      )}
    </CardContent>
  </Card>
);

export default NotesSection;

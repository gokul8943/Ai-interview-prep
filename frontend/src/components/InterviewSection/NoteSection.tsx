import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '../ui/textArea';

interface Props {
  notes: string;
  setNotes: (value: string) => void;
  saveAnswer: () => void;
  currentAnswer?: string;
}

const NotesSection: React.FC<Props> = ({ notes, setNotes, saveAnswer, currentAnswer }) => (
  <Card className="shadow-lg ">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <FileText className="w-5 h-5" />
        Notes & Answer
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your answer or notes here..."
        className="min-h-32 resize-none text-white"
      />
      <div className="flex gap-2">
        <Button onClick={saveAnswer} disabled={!notes.trim()} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Answer
        </Button>
        <Button onClick={() => setNotes('')} variant="outline">
          Clear Notes
        </Button>
      </div>
      {currentAnswer && (
        <Alert>
          <AlertDescription>
            <strong>Saved Answer:</strong> {currentAnswer}
          </AlertDescription>
        </Alert>
      )}
    </CardContent>
  </Card>
);

export default NotesSection;

import React from "react";
import { Mic, Square, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from '@/lib/utils';

interface Props {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  recordingTime: number;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const AudioRecorder: React.FC<Props> = ({
  isRecording,
  startRecording,
  stopRecording,
  recordingTime,
}) => {
  return (
    <Card className={cn('card-elevated')}>
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <Mic className="w-4 h-4" />
          </div>
          Audio Recording
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-slate-900">{formatTime(recordingTime)}</span>
          </div>

          {!isRecording ? (
            <Button
              onClick={startRecording}
              className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
            >
              <Mic className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="destructive"
              className="animate-pulse"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop Recording
            </Button>
          )}
        </div>

        {isRecording && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
              <Mic className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-red-700 text-sm">Recording in progress</p>
              <p className="mt-1 text-slate-700 text-sm leading-relaxed">Your speech will be converted to text in the answer section.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioRecorder;

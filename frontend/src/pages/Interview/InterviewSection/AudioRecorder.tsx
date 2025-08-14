import React from 'react';
import { Mic, Square, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  recordingTime: number;
  audioBlob: Blob | null;
  transcribe: () => void;
}

const AudioRecorder: React.FC<Props> = ({
  isRecording,
  startRecording,
  stopRecording,
  audioBlob,

}) => (
  <Card className="shadow-lg ">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <Mic className="w-5 h-5" />
        Audio Recording
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex gap-2">
          {!isRecording ? (
            <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700 text-white">
              <Mic className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          ) : (
            <Button onClick={stopRecording} variant="destructive" className="animate-pulse">
              <Square className="w-4 h-4 mr-2" />
              Stop Recording
            </Button>
          )}
          {/* {audioBlob && (
            <Button onClick={isPlaying ? pauseAudio : playAudio} variant="outline">
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </>
              )}
            </Button>
          )} */}
        </div>
      </div>

      {isRecording && (
        <Alert>
          <Mic className="w-4 h-4" />
          <AlertDescription>Recording in progress... Speak clearly and take your time.</AlertDescription>
        </Alert>
      )}

      {audioBlob && (
        <Alert>
          <FileText className="w-4 h-4" />
          <AlertDescription>
            Recording saved successfully! You can play it back or record a new one.
          </AlertDescription>
        </Alert>
      )}
    </CardContent>
  </Card>
);

export default AudioRecorder;

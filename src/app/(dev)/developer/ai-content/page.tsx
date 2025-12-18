
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateNewContentPrompts } from '@/ai/flows/generate-new-content-prompts';
import { generateAudioFromText } from '@/ai/flows/generate-audio-from-text';
import { Loader, Wand, Clipboard, ClipboardCheck } from 'lucide-react';

export default function AiContentPage() {
  const [promptType, setPromptType] = useState<'loveLetter' | 'sectionIdea'>('loveLetter');
  const [existingContent, setExistingContent] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  
  const [audioPrompt, setAudioPrompt] = useState('');
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState('');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const { toast } = useToast();

  const handleGeneratePrompt = async () => {
    setIsGeneratingPrompt(true);
    setGeneratedPrompt('');
    try {
      const result = await generateNewContentPrompts({
        promptType,
        existingContent,
      });
      setGeneratedPrompt(result.newPrompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Prompt',
        description: 'Could not generate a new prompt. Please try again.',
      });
    } finally {
      setIsGeneratingPrompt(false);
    }
  };
  
  const handleGenerateAudio = async () => {
    if (!audioPrompt) return;
    setIsGeneratingAudio(true);
    setGeneratedAudioUrl('');
    try {
      const result = await generateAudioFromText(audioPrompt);
      if (result.media) {
        setGeneratedAudioUrl(result.media);
      } else {
         throw new Error('No audio data returned.');
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Audio',
        description: 'Could not generate audio. Please try again.',
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const copyToClipboard = (text: string, type: 'url' | 'prompt') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
    toast({
        title: 'Copied to Clipboard!',
    })
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">AI Content Generation</h1>
        <p className="mt-2 text-muted-foreground">
          Use AI to generate new audio clips and writing prompts.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate Audio Clip</CardTitle>
            <CardDescription>
              Describe a sound, and the AI will generate it for you. You can then copy the URL and add it to your soundboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="audio-prompt">Sound Description</Label>
              <Input
                id="audio-prompt"
                placeholder="e.g., 'A soft, friendly notification sound' or 'A gentle laugh'"
                value={audioPrompt}
                onChange={(e) => setAudioPrompt(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button onClick={handleGenerateAudio} disabled={isGeneratingAudio || !audioPrompt}>
              {isGeneratingAudio ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand className="mr-2 h-4 w-4" />
              )}
              Generate Audio
            </Button>
            {isGeneratingAudio && (
                <div className="flex items-center text-sm text-muted-foreground">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    <span>Generating... this can take a moment.</span>
                </div>
            )}
            {generatedAudioUrl && (
              <div className="w-full space-y-4">
                <audio controls src={generatedAudioUrl} className="w-full">
                  Your browser does not support the audio element.
                </audio>
                <div className="flex items-center gap-2">
                  <Input readOnly value={generatedAudioUrl} className="bg-muted" />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(generatedAudioUrl, 'url')}>
                    {copiedUrl ? <ClipboardCheck className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      
        <Card>
          <CardHeader>
            <CardTitle>Generate Writing Prompts</CardTitle>
            <CardDescription>
              Generate new ideas for love letters or other content sections based on what's already there.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="existing-content">Tone Reference (Optional)</Label>
              <Textarea
                id="existing-content"
                placeholder="Paste some of your existing letters or ideas here to give the AI a sense of your writing style..."
                value={existingContent}
                onChange={(e) => setExistingContent(e.target.value)}
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button onClick={handleGeneratePrompt} disabled={isGeneratingPrompt}>
              {isGeneratingPrompt ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand className="mr-2 h-4 w-4" />
              )}
              Generate New Prompt
            </Button>
            {generatedPrompt && (
               <div className="w-full space-y-2 pt-4">
                 <Label>Generated Prompt</Label>
                 <div className="flex items-center gap-2">
                    <Textarea readOnly value={generatedPrompt} className="bg-muted" rows={3}/>
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(generatedPrompt, 'prompt')}>
                        {copiedPrompt ? <ClipboardCheck className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
                    </Button>
                 </div>
               </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

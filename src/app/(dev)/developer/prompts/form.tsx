'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateNewContentPrompts } from '@/ai/flows/generate-new-content-prompts';
import { letters, soundboardCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  promptType: z.enum(['loveLetter', 'sectionIdea']),
});

// Combine existing content to give the AI context
const existingContent = `
  Letters:
  ${letters.map(l => `Title: ${l.title}\nContent: ${l.content}`).join('\n\n')}

  Soundboard Categories:
  ${soundboardCategories.map(c => c.name).join(', ')}
`;

export default function PromptForm() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      promptType: 'loveLetter',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setGeneratedPrompt(null);
    try {
      const result = await generateNewContentPrompts({
        existingContent,
        promptType: data.promptType,
      });
      setGeneratedPrompt(result.newPrompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate prompt. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generator Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="promptType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type of prompt to generate" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="loveLetter">Love Letter Idea</SelectItem>
                        <SelectItem value="sectionIdea">Soundboard Section Idea</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose what kind of new idea you want to generate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Reference Content</FormLabel>
                <Textarea
                  readOnly
                  value={existingContent.substring(0, 500) + '...'}
                  className="h-48 bg-muted/50"
                />
                <FormDescription>
                  The AI will use the existing content to match the tone.
                </FormDescription>
              </FormItem>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Idea
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Generated Prompt</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {isLoading && <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />}
          {!isLoading && !generatedPrompt && (
            <p className="text-center text-muted-foreground">Your new prompt will appear here.</p>
          )}
          {generatedPrompt && (
            <blockquote className="border-l-4 border-accent pl-4 italic text-lg">
              {generatedPrompt}
            </blockquote>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

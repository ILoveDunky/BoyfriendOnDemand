'use server';
/**
 * @fileOverview A GenAI-powered tool to generate new writing prompts for love letters and section ideas.
 *
 * - generateNewContentPrompts - A function that generates new content prompts based on the existing content.
 * - GenerateNewContentPromptsInput - The input type for the generateNewContentPrompts function.
 * - GenerateNewContentPromptsOutput - The return type for the generateNewContentPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNewContentPromptsInputSchema = z.object({
  existingContent: z
    .string()
    .describe(
      'The existing content of love letters and section ideas, used to determine the tone and preferences for generating new prompts.'
    ),
  promptType: z
    .enum(['loveLetter', 'sectionIdea'])
    .describe('The type of prompt to generate: loveLetter or sectionIdea.'),
});
export type GenerateNewContentPromptsInput = z.infer<typeof GenerateNewContentPromptsInputSchema>;

const GenerateNewContentPromptsOutputSchema = z.object({
  newPrompt: z
    .string()
    .describe('The generated prompt for either a love letter or a section idea.'),
});
export type GenerateNewContentPromptsOutput = z.infer<typeof GenerateNewContentPromptsOutputSchema>;

export async function generateNewContentPrompts(
  input: GenerateNewContentPromptsInput
): Promise<GenerateNewContentPromptsOutput> {
  return generateNewContentPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNewContentPromptsPrompt',
  input: {schema: GenerateNewContentPromptsInputSchema},
  output: {schema: GenerateNewContentPromptsOutputSchema},
  prompt: `You are an AI assistant designed to help a developer generate new content prompts for a website dedicated to heartfelt messages and curated content for their girlfriend.

You will receive existing content from the website, and you will generate a new prompt based on the type requested.

The goal is to efficiently expand the content library with personalized and heartfelt entries that fit with the tone used within the existing application.

Existing Content:
{{existingContent}}

Prompt Type: {{promptType}}

Instructions: Generate a new prompt for the specified prompt type, ensuring it aligns with the tone and style of the existing content. The prompt should be specific and actionable, guiding the developer to create a meaningful and personalized entry.

New Prompt:`,
});

const generateNewContentPromptsFlow = ai.defineFlow(
  {
    name: 'generateNewContentPromptsFlow',
    inputSchema: GenerateNewContentPromptsInputSchema,
    outputSchema: GenerateNewContentPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

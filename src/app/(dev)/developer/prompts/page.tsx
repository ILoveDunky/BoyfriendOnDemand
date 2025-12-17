import PromptForm from './form';

export default function PromptsPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">AI Prompt Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Generate ideas for new love letters or soundboard section ideas based on the existing content and tone of the app.
        </p>
      </header>
      <PromptForm />
    </div>
  );
}

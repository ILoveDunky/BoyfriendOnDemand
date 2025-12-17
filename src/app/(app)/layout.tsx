import MainNav from '@/components/main-nav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8 fade-in">
        {children}
      </main>
    </div>
  );
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-4">CSS Test Page</h1>
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Card Component</h2>
        <p className="mb-4">This is a test to see if Tailwind CSS is working properly.</p>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          Primary Button
        </button>
      </div>
    </div>
  );
}
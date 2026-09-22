export default function SentryExample() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sentry Example Page</h1>
      <button 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-none"
        onClick={() => {
          throw new Error("This is a test error to verify Sentry configuration.");
        }}
      >
        Break the world (Trigger Error)
      </button>
    </div>
  );
}

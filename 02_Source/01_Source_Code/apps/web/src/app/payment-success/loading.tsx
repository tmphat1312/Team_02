export default function Loading() {
  return (
    <div className="grid place-content-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  );
}

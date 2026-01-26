import { useNavigate } from 'react-router-dom';

// Error Fallback Component
export function RouterErrorFallback({ error, resetErrorBoundary }) {
  // We try to use navigate, but if we are outside the Router provider (like in the top-level ErrorBoundary),
  // this hook might throw or return undefined depending on version.

  // Let's make this component robust:
  const isInsideRouter = tryUseNavigate();

  function tryUseNavigate() {
    try {
      return useNavigate();
    } catch {
      return null;
    }
  }

  const navigate = isInsideRouter;

  // Safe error message extraction
  const errorMessage = error instanceof Error ? error.message : String(error || 'Unknown error');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try again.
        </p>

        {/* Render error details safely */}
        <details className="mb-6 text-left">
          <summary className="cursor-pointer text-sm text-gray-500 mb-2">
            Error details
          </summary>
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-32">
            {errorMessage}
          </pre>
        </details>
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>

          {/* Only show Go Home if we can navigate, or use window.location */}
          <button
            onClick={() => {
              if (navigate) {
                navigate('/');
              } else {
                window.location.href = '/';
              }
            }}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

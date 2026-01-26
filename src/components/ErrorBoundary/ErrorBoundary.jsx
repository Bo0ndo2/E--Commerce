import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

// Error Fallback Component
// Note: Cannot use useNavigate() here because ErrorBoundary wraps BrowserRouter
// Using window.location instead for navigation
function ErrorFallback({ error, resetErrorBoundary }) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

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
        {error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 mb-2">
              Error details
            </summary>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-32">
              {error.message}
            </pre>
          </details>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

// Error Boundary Wrapper Component
export const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to console or error reporting service
        console.error('Error caught by boundary:', error, errorInfo);
      }}
      onReset={() => {
        // Reset any state if needed
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Button from '../UI/Button';
import Card from '../UI/Card';

// Error Fallback Component
// Note: Cannot use useNavigate() here because ErrorBoundary wraps BrowserRouter
// Using window.location instead for navigation
function ErrorFallback({ error, resetErrorBoundary }) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center" shadow="lg" padding="lg">
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
          <Button
            onClick={resetErrorBoundary}
          >
            Try Again
          </Button>
          <Button
            onClick={handleGoHome}
            variant="secondary"
          >
            Go Home
          </Button>
        </div>
      </Card>
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

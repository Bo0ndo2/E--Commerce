import React from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';

// Error Fallback Component
export function RouterErrorFallback({ error, resetErrorBoundary }) {
  // Safe error message extraction
  const errorMessage = error instanceof Error ? error.message : String(error || 'Unknown error');

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
          <Button
            onClick={resetErrorBoundary}
          >
            Try Again
          </Button>

          <Button
            onClick={() => {
              window.location.href = '/';
            }}
            variant="secondary"
          >
            Go Home
          </Button>
        </div>
      </Card>
    </div>
  );
}

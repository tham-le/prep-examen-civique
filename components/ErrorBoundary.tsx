
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Unhandled render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#F8FAFC] dark:bg-slate-900">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center mx-auto">
              <i className="fas fa-triangle-exclamation text-2xl"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Une erreur est survenue</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Vos données de progression sont conservées. Rechargez la page pour continuer.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

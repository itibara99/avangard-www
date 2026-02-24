import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Что-то пошло не так</h1>
            <p className="text-gray-400 mb-4">
              Произошла ошибка при загрузке страницы.
            </p>
            {this.state.error && (
              <details className="text-left mb-4">
                <summary className="text-yellow-400 cursor-pointer hover:text-yellow-300 mb-2">
                  Технические детали
                </summary>
                <pre className="text-xs text-gray-500 bg-gray-900 p-4 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.href = '/'}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-all"
            >
              Вернуться на главную
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

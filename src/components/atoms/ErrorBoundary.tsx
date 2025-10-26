'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='flex min-h-screen items-center justify-center'>
            <div className='text-center'>
              <h2 className='mb-2 text-xl font-semibold text-red-600'>
                Something went wrong
              </h2>
              <p className='mb-4 text-gray-600'>
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

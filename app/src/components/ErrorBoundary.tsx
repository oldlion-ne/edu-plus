import React from 'react';
import { Button } from './ui/button';
import { RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-6 bg-background">
          <div className="max-w-md w-full text-center space-y-6 p-8 border border-border bg-card">
            <div className="w-12 h-12 rounded-none bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground tracking-tight">
              Something went wrong
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-sans">
              We encountered an unexpected error. This has been logged for our engineers. Please try reloading the page or returning home.
            </p>
            {this.state.error && (
              <div className="bg-muted p-4 rounded-none text-left overflow-x-auto text-xs font-mono text-muted-foreground border border-border/50">
                {this.state.error.message}
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button onClick={this.handleReload} className="w-full sm:w-auto h-11 px-8 rounded-none">
                Reload Page
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto h-11 px-8 rounded-none">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

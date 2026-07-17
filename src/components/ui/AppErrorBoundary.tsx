import { Component, type ErrorInfo, type ReactNode } from 'react';
  interface AppErrorBoundaryProps {
    children: ReactNode;
  }
  interface AppErrorBoundaryState {
    hasError: boolean;
  }
  export default class AppErrorBoundary extends Component<
    AppErrorBoundaryProps,
    AppErrorBoundaryState
  > {
    public state: AppErrorBoundaryState = { hasError: false };
    public static getDerivedStateFromError(): AppErrorBoundaryState {
      return { hasError: true };
    }
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error('AppErrorBoundary caught an error:', error, errorInfo);
    }
    public render() {
      if (this.state.hasError) {
        return (
          <div className="page-wrap py-10">
            <div className="panel border-live/40 bg-live/10 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-live">
                Application Error
              </p>
              <h2 className="mt-2 text-xl font-bold text-text-primary">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Refresh the page. If this persists, check the console for details.
              </p>
            </div>
          </div>
        );
      }
      return this.props.children;
    }
}
import { Link } from 'react-router';
import { PageMeta } from '@/components/PageMeta';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center px-6 py-24 bg-background min-h-[60dvh]">
      <PageMeta title="Page Not Found"
        description="The page you are looking for could not be found. Return to EduPlus Skills home."
      />
      <div className="max-w-md w-full text-center space-y-8">

        {/* Error code */}
        <div className="space-y-2">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary mb-4">
            Error 404
          </p>
          <h1 className="font-heading text-6xl font-bold text-foreground tracking-tight leading-none">
            Page not found
          </h1>
        </div>

        {/* Divider */}
        <div className="w-8 h-px bg-border mx-auto" />

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed font-sans max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved. 
          Check the URL or navigate back to continue.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild className="w-full sm:w-auto h-11 px-8 rounded-none">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto h-11 px-8 rounded-none"
          >
            <button type="button" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </Button>
        </div>

      </div>
    </div>
  );
}

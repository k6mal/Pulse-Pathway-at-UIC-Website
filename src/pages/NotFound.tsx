import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="text-center">
        <h1 className="font-display text-7xl sm:text-8xl font-semibold tracking-tight text-foreground">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">This page doesn't exist.</p>
        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-80"
        >
          Return home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

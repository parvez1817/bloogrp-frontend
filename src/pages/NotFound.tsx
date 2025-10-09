import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen page-enter">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-center">
          <div className="text-center medical-card p-10 rounded-xl shadow-sm card-enter theme-transition">
            <h1 className="mb-4 text-6xl font-extrabold text-primary">404</h1>
            <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
            <Button asChild className="predict-button text-primary-foreground">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 nav-backdrop border-b border-border theme-transition">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Blood Group Predictor
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full hover:bg-accent transition-all duration-300 hover:scale-110"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 transition-all duration-300 rotate-0 scale-100" />
              ) : (
                <Sun className="h-4 w-4 transition-all duration-300 rotate-0 scale-100" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button 
              asChild 
              className="predict-button text-primary-foreground hover:bg-primary-hover"
            >
              <Link to="/">Predict Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link text-lg ${isActive(item.path) ? "active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-full hover:bg-accent transition-all duration-300 hover:scale-110"
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4 transition-all duration-300 rotate-0 scale-100" />
                  ) : (
                    <Sun className="h-4 w-4 transition-all duration-300 rotate-0 scale-100" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <Button 
                  asChild 
                  className="predict-button text-primary-foreground w-fit"
                >
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    Predict Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
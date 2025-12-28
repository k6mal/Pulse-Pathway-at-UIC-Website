import { Button } from "@/components/ui/button";
import logo from "@/assets/pulse-pathway-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Brand and nav links */}
          <div className="flex items-center gap-8">
            <img src={logo} alt="Pulse Pathway at UIC" className="h-10" />
            <div className="hidden md:flex items-center gap-6">
              <a 
                href="#about" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                About
              </a>
              <a 
                href="#join" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Join
              </a>
              <a 
                href="#rush" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                RUSH
              </a>
            </div>
          </div>

          {/* Right side - CTA Button */}
          <Button variant="default" size="sm">
            WhatsApp Group
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

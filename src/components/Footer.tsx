import { Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/stringer_.xo._"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://www.facebook.com/share/1FmnugfjYS/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/parvez-ahamed-953717309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={28} />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fingroop AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

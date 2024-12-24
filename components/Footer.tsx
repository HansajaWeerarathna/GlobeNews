import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Instagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left mb-4 md:mb-0"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
              Globe News
            </h3>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Globe News. All Rights Reserved.
            </p>
          </motion.div>
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <link.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

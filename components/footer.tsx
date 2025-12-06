"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Mail,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
} from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Achievements", href: "/achievements" },
    { label: "Contribute", href: "/contribute" },
  ],
  resources: [
    { label: "Publications", href: "/achievements#publications" },
    { label: "Gallery", href: "/about#gallery" },
    { label: "Contact", href: "/contribute#contact" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/teamdurbar", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com/@teamdurbar", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/teamdurbar", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/teamdurbar", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-space-gunmetal border-t border-gray-100 dark:border-zinc-800">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display tracking-wider text-gray-900 dark:text-white uppercase">
                Team <span className="text-gradient-mars">Durbar</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Forging the future of Martian exploration from Bangladesh. A Mars Rover team from KUET pushing the boundaries of space robotics.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-mars dark:hover:text-mars transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-mars dark:hover:text-mars transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-mars dark:hover:text-mars transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 text-mars flex-shrink-0" />
                <span>
                  KUET, Khulna-9203,<br />
                  Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-mars flex-shrink-0" />
                <a
                  href="mailto:teamdurbar@kuet.ac.bd"
                  className="hover:text-mars transition-colors"
                >
                  teamdurbar@kuet.ac.bd
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © 2025 Team Durbar – KUET. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Made with passion for Mars exploration 🚀
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


import { ApplicationName } from "@/config/navlinks.config";
import { Link } from "next-view-transitions";
import React from "react";

const socialLinks = {
  portfolio: "https://www.linkedin.com/in/tharisha-perera/",
};

export const Footer = () => {
  const year = new Date();
  return (
    <footer className="w-full h-20 flex items-center justify-center px-6 py-8 md:px-16 bg-base-300 text-base-content border-t">
      <aside className="flex text-sm justify-center text-center">
        <p>
          Copyright © {year.getFullYear()} :{" "}
          <span className="font-semibold tracking-widest uppercase">
            <span>{ApplicationName}</span>
          </span>{" "}
          - All right reserved by{" "}
          <Link href={socialLinks.portfolio} legacyBehavior>
            <a target="_blank" className="underline underline-offset-2">
              {" "}
              Tharisha Perera.
            </a>
          </Link>
        </p>
      </aside>
    </footer>
  );
};

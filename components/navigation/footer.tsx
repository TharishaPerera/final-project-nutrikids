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
          <a
            href={socialLinks.portfolio}
            className="underline underline-offset-2"
            target="_blank"
            rel="noreferrer noopener"
          >
            {" "}
            Tharisha Perera.
          </a>
        </p>
      </aside>
    </footer>
  );
};

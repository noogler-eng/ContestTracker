import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 py-6 text-center text-sm text-gray-500 flex flex-col gap-3 items-center">
      <p>
        © {new Date().getFullYear()} ContestTracker. Built with ❤️ by Sharad
        Poddar.
      </p>
      <p className="text-xs">Licensed under the MIT License</p>
      <div className="flex gap-4 mt-2">
        <a
          href="https://github.com/noogler-eng"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white flex items-center gap-1"
        >
          <Github className="w-4 h-4" /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/sharad-poddar-895985283/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white flex items-center gap-1"
        >
          <Linkedin className="w-4 h-4" /> LinkedIn
        </a>
        <a
          href="mailto:poddarsharad460@email.com"
          className="hover:text-white flex items-center gap-1"
        >
          <Mail className="w-4 h-4" /> Contact
        </a>
      </div>
    </footer>
  );
}

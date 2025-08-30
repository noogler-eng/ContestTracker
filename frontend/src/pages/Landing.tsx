import { DotPattern } from "@/components/magicui/dot-pattern";
import Button from "@/components/magicui/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import user from "@/store/user_atom";
import { motion } from "framer-motion";
import {
  Trophy,
  Video,
  Brain,
  Calendar,
  Code2,
  Rocket,
  Youtube,
  HelpCircle,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Landing() {
  const navigate = useNavigate();
  const curr_user = useRecoilValue(user);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-red-400" />,
      title: "Contest Aggregator",
      desc: "All contests from LeetCode, Codeforces, and CodeChef in one place.",
    },
    {
      icon: <Video className="w-8 h-8 text-orange-400" />,
      title: "Solution Videos",
      desc: "Watch curated solutions from TLE Eliminators' YouTube channel.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-yellow-400" />,
      title: "Daily Challenges",
      desc: "Stay consistent with LeetCode daily problems and solutions.",
    },
    {
      icon: <Brain className="w-8 h-8 text-pink-400" />,
      title: "AI-Powered Solutions",
      desc: "Get Gemini-powered explanations for LeetCode contests.",
    },
  ];

  
  const techStack = [
    {
      icon: <Code2 className="w-8 h-8 text-blue-400" />,
      title: "Modern Tech Stack",
      desc: "GraphQL, Express, and Node.js with TypeScript ensure scalability and speed.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-green-400" />,
      title: "Efficiency & Reliability",
      desc: "Optimized APIs guarantee smooth performance and fast contest updates.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-purple-400" />,
      title: "Platform Integrations",
      desc: "Seamless connections to LeetCode, Codeforces, and CodeChef contests.",
    },
    {
      icon: <Youtube className="w-8 h-8 text-red-500" />,
      title: "TLE Eliminators Backed",
      desc: "High-quality tutorials and problem solutions trusted by thousands.",
    },
  ];

  const faqs = [
    {
      q: "What is ContestTracker?",
      a: "ContestTracker is a one-stop platform aggregating coding contests, solutions, and tutorials from multiple platforms like LeetCode, Codeforces, and CodeChef.",
    },
    {
      q: "Is it free to use?",
      a: "Yes, ContestTracker is free to use. Some advanced features may require sign-in for personalization.",
    },
    {
      q: "How do TLE Eliminators videos integrate here?",
      a: "We automatically fetch solution videos from TLE Eliminators' YouTube channel and present them alongside relevant contests.",
    },
    {
      q: "Why should I trust the AI-powered solutions?",
      a: "Our AI solutions are powered by Gemini and are curated to ensure accuracy and reliability, helping you learn efficiently.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24 overflow-hidden">
        <DotPattern className="absolute inset-0 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]" />

        {/* Left Content */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="z-10 text-white flex flex-col items-center lg:items-start gap-4 sm:gap-6 max-w-2xl text-center lg:text-left"
        >
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent"
          >
            ContestTracker
          </motion.h1>

          <motion.h3
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl sm:text-2xl lg:text-4xl font-semibold text-gray-300"
          >
            When Every Practice Counts
          </motion.h3>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-xl"
          >
            Aggregate all major contests from LeetCode, Codeforces, and CodeChef
            in one place. Get solution videos from TLE Eliminators, daily
            LeetCode problems, and AI-powered contest solutions using Gemini —
            everything you need to level up your preparation.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full sm:w-auto"
          >
            <Button
              onClick={() => navigate("/home")}
              variant="primary"
              text="Explore Contests"
            />
            {!curr_user.email && (
              <Button
                onClick={() => navigate("/login")}
                variant="secondary"
                text="Sign In"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10 lg:mb-0 flex justify-center"
        >
          <motion.img
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
            src="./Contest-Tracker-Logo.png"
            width={320}
            height={320}
            alt="Contest Tracker Logo"
            className="drop-shadow-2xl rounded-2xl sm:w-96 lg:w-[480px]"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center bg-[#1a1a1a] p-6 rounded-2xl shadow-md shadow-black/30 hover:shadow-red-500/20 transition"
          >
            {feature.icon}
            <h4 className="mt-4 text-lg font-semibold text-white">
              {feature.title}
            </h4>
            <p className="mt-2 text-sm text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl px-6 py-20 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12"
        >
          ⚡ Why Choose <span className="text-red-500">ContestTracker</span>?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {techStack.map((stack, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.07, rotate: 1 }}
              className="relative flex flex-col items-center text-center bg-gradient-to-br from-[#161616] to-[#1f1f1f] p-8 rounded-3xl shadow-lg shadow-black/40 hover:shadow-red-500/30 transition"
            >
              <div className="absolute -top-5 flex items-center justify-center w-14 h-14 rounded-full bg-black border border-gray-700">
                {stack.icon}
              </div>
              <h4 className="mt-10 text-lg font-semibold text-white">
                {stack.title}
              </h4>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                {stack.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl px-6 py-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10 flex items-center justify-center gap-2">
          <HelpCircle className="w-7 h-7 text-red-500" /> Frequently Asked
          Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-gray-800 rounded-lg px-4"
            >
              <AccordionTrigger className="text-left text-white hover:text-red-400 text-lg">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* Footer */}
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
    </div>
  );
}

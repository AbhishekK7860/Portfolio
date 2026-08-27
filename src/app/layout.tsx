import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Abhishek Kesarwani — AI / GenAI Builder",
    template: "%s · Abhishek Kesarwani",
  },
  description:
    "AI / GenAI builder from India — focused on agentic systems, prompt engineering, AI evaluation, and reliable AI-assisted software.",
  keywords: [
    "Abhishek Kesarwani",
    "AI engineer",
    "AI evaluation",
    "multi-agent systems",
    "generative AI",
    "Next.js",
    "prompt engineering",
  ],
  authors: [{ name: "Abhishek Kesarwani" }],
  creator: "Abhishek Kesarwani",
  openGraph: {
    title: "Abhishek Kesarwani — AI / GenAI Builder",
    description:
      "Multi-agent pipelines, LLM-powered applications, and immersive experiences at the intersection of AI, the web, and human creativity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

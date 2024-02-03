"use client";
import Navbar from "@/components/Navbar";
import EmailForm from "@/components/EmailForm";
import Analyses from "@/components/Analyses";
import { useState } from "react";

export default function Home() {
  const [analysisResults, setAnalysisResults] = useState([]);

  return (
    <main>
      <Navbar />
      <div className="px-6">
        <EmailForm analysisResults={analysisResults} setAnalysisResults={setAnalysisResults} />
        <Analyses analysisResults={analysisResults} />
      </div>
    </main>
  );
}

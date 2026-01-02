
import React, { useState, useRef } from 'react';
import { Layout } from './components/Layout';
import { analyzeIPStrategy } from './services/geminiService';
import { AnalysisResult } from './types';
import { ResultCard } from './components/ResultCard';
import { VisualSummary } from './components/VisualSummary';

// Declare html2pdf for TypeScript
declare var html2pdf: any;

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await analyzeIPStrategy(input);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate IP strategy. Please try again with a more detailed description.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async () => {
    if (!resultsRef.current) return;
    
    setIsGeneratingPdf(true);
    
    try {
      const element = resultsRef.current;
      const opt = {
        margin: [10, 10],
        filename: `Idea-to-IP-Intelligence-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          scrollY: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF Generation error:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mb-12 text-center no-print">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Unlock Your <span className="text-indigo-600">Competitive Moat</span>
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Input your business idea, skill, or website. Our AI strategist will identify 5 unique 
          Intellectual Properties to protect your future and differentiate your brand.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-16 no-print">
        <form onSubmit={handleAnalyze} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white border border-slate-200 p-2 rounded-2xl shadow-xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. A marketplace for local artisans to sell handmade furniture using AR previewing tools..."
              className="w-full h-32 px-4 py-3 text-slate-800 placeholder-slate-400 bg-transparent border-none focus:ring-0 resize-none text-lg"
              disabled={loading}
            />
            <div className="flex items-center justify-between px-4 pb-2">
              <span className="text-xs text-slate-400 font-medium">
                Tip: The more details you provide, the better the strategy.
              </span>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-bold transition-all shadow-lg shadow-indigo-200 ${
                  loading || !input.trim() 
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Strategy</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}
      </div>

      {loading && !result && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse no-print">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-64 bg-slate-100 rounded-xl border border-slate-200"></div>
          ))}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-12 pb-20 print-container" ref={resultsRef}>
          {/* Enhanced Report Header Section */}
          <div className="mb-8 p-10 bg-white rounded-3xl border-2 border-slate-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Idea to IP Intelligence</h1>
                <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span className="bg-slate-100 px-2 py-1 rounded">REF: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  <span>•</span>
                  <span>Issued: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-100">Ω</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Subject Overview</h3>
                  <p className="text-slate-800 text-lg font-medium leading-relaxed">
                    {result.ideaSummary}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Strategic Goal</h3>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    {result.analysisIntent}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center text-[10px] text-slate-300 font-medium uppercase tracking-widest">
              <span>Confidential IP Strategy Analysis • Intelligence for Action</span>
            </div>
          </div>

          <VisualSummary result={result} />
          
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h3 className="text-2xl font-bold text-slate-900">Key Intellectual Property Pathways</h3>
              <div className="flex items-center space-x-3 no-print">
                <button
                  onClick={downloadPdf}
                  disabled={isGeneratingPdf}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm border transition-colors shadow-sm ${
                    isGeneratingPdf 
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                  }`}
                >
                  {isGeneratingPdf ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating File...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download Intelligence PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.suggestions.map((suggestion, idx) => (
                <ResultCard key={idx} suggestion={suggestion} />
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-xl font-bold mb-3">Strategic Advice</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Intellectual property is more than just registration; it's about building a fortress around your profit margins. 
                Start by filing for low-cost provisional patents or registering trademarks early. 
                Remember: a moat is only effective if you actively maintain it.
              </p>
              <button 
                onClick={downloadPdf}
                disabled={isGeneratingPdf}
                className={`bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors no-print ${
                  isGeneratingPdf ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isGeneratingPdf ? 'Processing...' : 'Export PDF Intelligence'}
              </button>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 no-print">
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
            <h4 className="font-bold mb-2">Input Idea</h4>
            <p className="text-sm">Briefly describe your business, skill, or provide a URL.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
            <h4 className="font-bold mb-2">AI Reasoning</h4>
            <p className="text-sm">Gemini analyzes hidden assets and uniqueness markers.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
            <h4 className="font-bold mb-2">Secure Assets</h4>
            <p className="text-sm">Receive 5 specific IP strategies to defend your intelligence.</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;

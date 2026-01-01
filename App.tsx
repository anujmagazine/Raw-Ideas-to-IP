
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { analyzeIPStrategy } from './services/geminiService';
import { AnalysisResult } from './types';
import { ResultCard } from './components/ResultCard';
import { VisualSummary } from './components/VisualSummary';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Unlock Your <span className="text-indigo-600">Competitive Moat</span>
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Input your business idea, skill, or website. Our AI strategist will identify 5 unique 
          Intellectual Properties to protect your future and differentiate your brand.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-64 bg-slate-100 rounded-xl border border-slate-200"></div>
          ))}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-12 pb-20">
          <VisualSummary result={result} />
          
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-900">Top 5 IP Recommendations</h3>
              <div className="flex items-center space-x-2 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                <span>Curated by AI Strategist</span>
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
                onClick={() => window.print()}
                className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                Export Strategy PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
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
            <h4 className="font-bold mb-2">Build Moat</h4>
            <p className="text-sm">Receive 5 specific IP strategies to defend your business.</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;

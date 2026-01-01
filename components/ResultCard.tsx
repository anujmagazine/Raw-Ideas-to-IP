
import React from 'react';
import { IPSuggestion, IPType } from '../types';

const typeColors: Record<IPType, string> = {
  [IPType.PATENT]: 'bg-amber-100 text-amber-700 border-amber-200',
  [IPType.TRADEMARK]: 'bg-blue-100 text-blue-700 border-blue-200',
  [IPType.COPYRIGHT]: 'bg-green-100 text-green-700 border-green-200',
  [IPType.TRADE_SECRET]: 'bg-purple-100 text-purple-700 border-purple-200',
  [IPType.DESIGN_RIGHT]: 'bg-rose-100 text-rose-700 border-rose-200',
};

interface Props {
  suggestion: IPSuggestion;
}

export const ResultCard: React.FC<Props> = ({ suggestion }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeColors[suggestion.type]}`}>
          {suggestion.type}
        </span>
        <div className="flex items-center text-slate-400">
          <span className="text-xs mr-1">Value:</span>
          <span className="text-xs font-bold text-slate-700">{suggestion.potentialValue}/100</span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
        {suggestion.title}
      </h3>
      
      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
        {suggestion.description}
      </p>

      <div className="mt-auto space-y-4">
        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
          <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Moat Strategy
          </h4>
          <p className="text-indigo-900 text-xs italic leading-relaxed">
            {suggestion.moatStrategy}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Complexity:</span>
            <div className="flex space-x-0.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <div 
                  key={level}
                  className={`w-2 h-2 rounded-full ${level <= suggestion.complexity ? 'bg-indigo-500' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
          <div className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
            Unique Logic
          </div>
        </div>
      </div>
    </div>
  );
};

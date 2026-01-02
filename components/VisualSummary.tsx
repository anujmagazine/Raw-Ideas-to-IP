
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { AnalysisResult, IPType } from '../types';
import { typeHexColors } from './ResultCard';

interface Props {
  result: AnalysisResult;
}

export const VisualSummary: React.FC<Props> = ({ result }) => {
  const data = result.suggestions.map(s => ({
    name: s.title.length > 15 ? s.title.substring(0, 12) + '...' : s.title,
    value: s.potentialValue,
    fullTitle: s.title,
    type: s.type
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-xl font-bold text-slate-900">Value Proposition Comparison</h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">{result.summary}</p>
          
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-xs text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-700 mb-1">About the Moat Strength Score:</p>
            <p>
              This score indicates the aggregate defensibility of your business. It is calculated by weighting the 
              unique differentiation of each suggested IP asset, their technical complexity, and the synergy of 
              how these assets work together to block market entry.
            </p>
            <div className="mt-2 flex space-x-4">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-400 mr-1"></span> 0-40: Vulnerable</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-400 mr-1"></span> 41-70: Defensible</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-1"></span> 71+: Fortified</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 min-w-[160px] self-start">
          <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">Moat Strength</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-4xl font-black text-white">{result.overallMoatScore}</span>
            <span className="text-indigo-200 text-sm font-medium">/100</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              fontSize={11} 
              tick={{ fill: '#64748b', fontWeight: 500 }} 
              axisLine={false} 
              tickLine={false}
              dy={10}
            />
            <YAxis domain={[0, 100]} hide />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
              formatter={(value: number) => [`${value}/100`, 'Strategic Value']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={50} isAnimationActive={false}>
              <LabelList dataKey="value" position="top" style={{ fill: '#475569', fontSize: '11px', fontWeight: 'bold' }} />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={typeHexColors[entry.type as IPType]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Legend: IP Category & Strategic Value</h4>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(typeHexColors).map(([type, color]) => (
            <div key={type} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs font-medium text-slate-600">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

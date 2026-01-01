
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AnalysisResult } from '../types';

interface Props {
  result: AnalysisResult;
}

export const VisualSummary: React.FC<Props> = ({ result }) => {
  const data = result.suggestions.map(s => ({
    name: s.title.length > 20 ? s.title.substring(0, 17) + '...' : s.title,
    value: s.potentialValue,
    fullTitle: s.title
  }));

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f97316'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Strategic Moat Assessment</h2>
          <p className="text-slate-500 text-sm">{result.summary}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl border border-indigo-100 min-w-[140px]">
          <span className="text-indigo-600 text-sm font-bold uppercase tracking-wider">Moat Score</span>
          <span className="text-4xl font-black text-indigo-700">{result.overallMoatScore}</span>
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" fontSize={12} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <span className="text-xs text-slate-400 font-medium italic">Comparison of relative strategic value across suggested IPs</span>
      </div>
    </div>
  );
};

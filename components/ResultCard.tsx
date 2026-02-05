import React from 'react';

interface ResultCardProps {
    title: string;
    value: string | number;
    unit?: string;
    subtext?: string;
    highlight?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, value, unit, subtext, highlight = false }) => {
    return (
        <div className={`p-4 rounded-xl border ${highlight ? 'bg-blue-900/20 border-blue-500/30' : 'bg-slate-800 border-slate-700'} flex flex-col items-center justify-center text-center shadow-lg`}>
            <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${highlight ? 'text-blue-300' : 'text-slate-400'}`}>
                {title}
            </span>
            <div className="flex items-baseline space-x-1">
                <span className={`text-2xl font-bold ${highlight ? 'text-blue-100' : 'text-white'}`}>
                    {value}
                </span>
                {unit && <span className="text-sm text-slate-400 font-medium">{unit}</span>}
            </div>
            {subtext && <span className="text-xs text-slate-500 mt-1">{subtext}</span>}
        </div>
    );
};
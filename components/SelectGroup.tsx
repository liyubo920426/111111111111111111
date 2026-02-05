import React from 'react';

interface SelectGroupProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: { value: string; label: string }[];
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ label, value, onChange, options }) => {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                {label}
            </label>
            <div className="relative">
                <select
                    className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
import React from 'react';

interface InputGroupProps {
    label: string;
    value: string | number;
    onChange: (val: string) => void;
    type?: string;
    suffix?: string;
    placeholder?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ label, value, onChange, type = "number", suffix, placeholder }) => {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    inputMode="decimal"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
                {suffix && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
};
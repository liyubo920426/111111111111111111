import React, { useState } from 'react';
import { VenueType, CalculationStrategy, VENUE_DATA } from '../types';
import { InputGroup } from '../components/InputGroup';
import { SelectGroup } from '../components/SelectGroup';
import { ResultCard } from '../components/ResultCard';

export const CapacityTool: React.FC = () => {
    const [venueType, setVenueType] = useState<VenueType>(VenueType.MUSEUM);
    const [strategy, setStrategy] = useState<CalculationStrategy>(CalculationStrategy.QUALITY);
    const [area, setArea] = useState<string>('1000');
    const [hours, setHours] = useState<string>('8');

    const config = VENUE_DATA[venueType];
    const numArea = parseFloat(area) || 0;
    const numHours = parseFloat(hours) || 0;
    const openMinutes = numHours * 60;

    // --- Strategy Logic ---
    let effectiveCoeff = 0;
    let effectiveComfortDensity = 0;
    
    // Note: peakDensity and safetyDensity are fixed per venue type in current data, 
    // but strategy logic could theoretically affect them if ranges were provided.
    // Following strict instructions:
    // Quality: Coeff Min, Comfort Density Max
    // Traffic: Coeff Max, Comfort Density Min
    
    if (strategy === CalculationStrategy.QUALITY) {
        effectiveCoeff = config.coefficientMin;
        effectiveComfortDensity = config.comfortDensityMax;
    } else {
        effectiveCoeff = config.coefficientMax;
        effectiveComfortDensity = config.comfortDensityMin;
    }

    const effectiveArea = numArea * effectiveCoeff;

    // --- 1. Capacity Calculations ---
    // 最佳承载量 (Best/Recommended)
    const optimalCapacity = effectiveComfortDensity > 0 ? Math.floor(effectiveArea / effectiveComfortDensity) : 0;
    // 最大承载量 (Max/Crowded)
    const maxCapacity = config.peakDensity > 0 ? Math.floor(effectiveArea / config.peakDensity) : 0;
    // 安全上限 (Safety/Emergency)
    const safetyLimit = config.safetyDensity > 0 ? Math.floor(effectiveArea / config.safetyDensity) : 0;

    // --- 2. Time Calculations ---
    // Helper for time formatting
    const formatTime = (mins: number) => {
        const h = Math.floor(mins / 60);
        const m = Math.round(mins % 60);
        return h > 0 ? `${h}小时${m}分` : `${m}分钟`;
    };

    // Helper for calculating fatigue-adjusted time
    const calculateAdjustedStay = (baseMinutes: number) => {
        // Linear scaling first
        let t = baseMinutes;
        // Fatigue correction: > 180 min (3 hours)
        if (t > 180) {
            t = 180 + (t - 180) * 0.2;
        }
        // Cap at open time
        if (openMinutes > 0) {
            t = Math.min(t, openMinutes);
        }
        return t;
    };

    // Base raw minutes (Type 1.0 - Deep/Standard)
    const rawStandardMinutes = (numArea / 100) * config.stayCoeff;
    
    // Adjusted Stay Times for different visitor types
    const stayTimeStandard = calculateAdjustedStay(rawStandardMinutes * 1.0);
    const stayTimeQuick = calculateAdjustedStay(rawStandardMinutes * 0.6);
    const stayTimeHardcore = calculateAdjustedStay(rawStandardMinutes * 1.5);

    // --- 3. Flow & Turnover Calculations ---
    // Use Standard (Deep) Stay Time for main flow calculations
    const benchmarkStayTime = stayTimeStandard;
    
    // Turnover Rate (翻台率)
    const turnoverRate = benchmarkStayTime > 0 ? (openMinutes / benchmarkStayTime) : 0;

    // Daily Flows
    const recDailyFlow = Math.floor(optimalCapacity * turnoverRate);
    const limitDailyFlow = Math.floor(maxCapacity * turnoverRate);

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Input Section */}
            <div className="space-y-4">
                <SelectGroup
                    label="展馆类型"
                    value={venueType}
                    onChange={(val) => setVenueType(val as VenueType)}
                    options={Object.entries(VENUE_DATA).map(([key, data]) => ({
                        value: key,
                        label: data.name
                    }))}
                />
                
                <div className="bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50 text-sm text-slate-400 flex items-start gap-2">
                   <svg className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   <span>{config.description}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <InputGroup
                        label="常设展厅面积"
                        value={area}
                        onChange={setArea}
                        suffix="㎡"
                    />
                    <InputGroup
                        label="开放时长"
                        value={hours}
                        onChange={setHours}
                        suffix="小时"
                    />
                </div>

                {/* Strategy Switch */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                        计算策略
                    </label>
                    <div className="grid grid-cols-2 p-1 bg-slate-800 rounded-xl border border-slate-700">
                        <button
                            onClick={() => setStrategy(CalculationStrategy.QUALITY)}
                            className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                                strategy === CalculationStrategy.QUALITY 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            🛡️ 安全与品质
                        </button>
                        <button
                            onClick={() => setStrategy(CalculationStrategy.TRAFFIC)}
                            className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                                strategy === CalculationStrategy.TRAFFIC 
                                ? 'bg-emerald-600 text-white shadow-lg' 
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            💰 流量与收益
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 ml-1">
                        {strategy === CalculationStrategy.QUALITY 
                            ? "宽松模式：系数取小，人均面积取大" 
                            : "紧凑模式：系数取大，人均面积取小"}
                    </p>
                </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4 pt-2">
                {/* 1. Capacity */}
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1 border-b border-slate-800 pb-2">
                    瞬时承载力 (Instant Capacity)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-3">
                        <ResultCard
                            title="最佳承载量 (推荐)"
                            value={optimalCapacity.toLocaleString()}
                            unit="人"
                            highlight={true}
                            subtext="保证体验的理想人数"
                        />
                    </div>
                    <ResultCard
                        title="最大承载量"
                        value={maxCapacity.toLocaleString()}
                        unit="人"
                        subtext="拥挤状态"
                    />
                    <div className="col-span-2">
                        <ResultCard
                            title="安全上限 (红线)"
                            value={safetyLimit.toLocaleString()}
                            unit="人"
                            subtext="消防应急极限"
                        />
                    </div>
                </div>

                {/* 2. Flow Analysis */}
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1 border-b border-slate-800 pb-2 pt-2">
                    日均流量与周转 (Daily Flow)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    <ResultCard
                        title="翻台率"
                        value={turnoverRate.toFixed(1)}
                        unit="次/日"
                    />
                    <div className="col-span-2">
                        <ResultCard
                            title="推荐日流量"
                            value={recDailyFlow.toLocaleString()}
                            unit="人/天"
                            highlight={true}
                        />
                    </div>
                    <div className="col-span-3">
                        <ResultCard
                            title="极限日流量"
                            value={limitDailyFlow.toLocaleString()}
                            unit="人/天"
                            subtext="满负荷运转下的最大接待能力"
                        />
                    </div>
                </div>

                {/* 3. Time Analysis */}
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1 border-b border-slate-800 pb-2 pt-2">
                    停留时长模型 (Stay Duration)
                </h3>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-700/50">
                        <span className="text-slate-400 text-sm">深度体验 (基准)</span>
                        <span className="text-xl font-bold text-blue-100">{formatTime(stayTimeStandard)}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">走马观花 (0.6x)</span>
                        <span className="text-slate-300">{formatTime(stayTimeQuick)}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">硬核学习 (1.5x)</span>
                        <span className="text-slate-300">{formatTime(stayTimeHardcore)}</span>
                    </div>
                    {(rawStandardMinutes > 180) && (
                        <p className="text-[10px] text-yellow-500/80 pt-1">
                            *已触发疲劳修正模型：超过3小时后，模拟观众疲劳导致浏览速度加快。
                        </p>
                    )}
                     {(stayTimeStandard >= openMinutes) && (
                        <p className="text-[10px] text-red-400/80 pt-1">
                            *时长已受限于开馆时间 ({hours}h)。
                        </p>
                    )}
                </div>
            </div>

             {/* Debug Info */}
             <div className="mt-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-[10px] text-slate-500 space-y-1">
                <div className="flex justify-between">
                    <span>计算策略:</span>
                    <span className="text-slate-400">{strategy === CalculationStrategy.QUALITY ? '安全与品质' : '流量与收益'}</span>
                </div>
                <div className="flex justify-between">
                    <span>有效面积系数:</span>
                    <span className="font-mono text-slate-300">{effectiveCoeff.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>舒适人均指标:</span>
                    <span className="font-mono text-slate-300">{effectiveComfortDensity.toFixed(1)} ㎡/人</span>
                </div>
                 <div className="flex justify-between">
                    <span>单位停留系数:</span>
                    <span className="font-mono text-slate-300">{config.stayCoeff} min/100㎡</span>
                </div>
            </div>
        </div>
    );
};
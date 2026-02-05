import React, { useState } from 'react';
import { ScreenRatio } from '../types';
import { InputGroup } from '../components/InputGroup';
import { SelectGroup } from '../components/SelectGroup';
import { ResultCard } from '../components/ResultCard';

export const ScreenSizeTool: React.FC = () => {
    const [ratio, setRatio] = useState<ScreenRatio>(ScreenRatio.R16_9);
    const [inches, setInches] = useState<string>('55');

    // Calculation
    const diagInch = parseFloat(inches) || 0;
    const [wR, hR] = ratio.split(':').map(Number);
    
    // Angle method: theta = atan(h/w)
    const theta = Math.atan(hR / wR);
    const widthInch = diagInch * Math.cos(theta);
    const heightInch = diagInch * Math.sin(theta);

    // Convert to mm (1 inch = 25.4 mm)
    const widthMm = (widthInch * 25.4).toFixed(0);
    const heightMm = (heightInch * 25.4).toFixed(0);

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <p className="text-sm text-slate-400 mb-4">输入屏幕对角线尺寸（英寸），计算实际长宽。</p>
                <div className="grid grid-cols-2 gap-4">
                    <SelectGroup
                        label="屏幕比例"
                        value={ratio}
                        onChange={(val) => setRatio(val as ScreenRatio)}
                        options={[
                            { value: ScreenRatio.R16_9, label: "16:9 (宽屏)" },
                            { value: ScreenRatio.R4_3, label: "4:3 (普屏)" }
                        ]}
                    />
                    <InputGroup
                        label="尺寸 (英寸)"
                        value={inches}
                        onChange={setInches}
                        suffix="inch"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <ResultCard
                    title="显示宽度"
                    value={widthMm}
                    unit="mm"
                    highlight
                />
                <ResultCard
                    title="显示高度"
                    value={heightMm}
                    unit="mm"
                    highlight
                />
            </div>

             <div className="grid grid-cols-2 gap-4 mt-2">
                <ResultCard
                    title="宽度 (m)"
                    value={(parseFloat(widthMm)/1000).toFixed(2)}
                    unit="m"
                />
                <ResultCard
                    title="高度 (m)"
                    value={(parseFloat(heightMm)/1000).toFixed(2)}
                    unit="m"
                />
            </div>
            
            <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-700/30 text-xs text-yellow-200/70 text-center">
                * 计算结果为屏幕显示区域尺寸，不含边框。
            </div>
        </div>
    );
};
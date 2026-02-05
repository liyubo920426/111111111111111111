import React, { useState, useEffect } from 'react';
import { ImageRatio } from '../types';
import { InputGroup } from '../components/InputGroup';
import { SelectGroup } from '../components/SelectGroup';

export const ImageRatioTool: React.FC = () => {
    const [ratio, setRatio] = useState<ImageRatio>(ImageRatio.R16_9);
    const [width, setWidth] = useState<string>('1920');
    const [height, setHeight] = useState<string>('1080');
    const [lastEdited, setLastEdited] = useState<'width' | 'height'>('width');

    const calculate = (target: 'width' | 'height', val: string) => {
        const numVal = parseFloat(val);
        if (isNaN(numVal) || numVal === 0) return;

        const [wRatio, hRatio] = ratio.split(':').map(Number);
        
        if (target === 'width') {
            // Changed Width, Calculate Height
            const newHeight = (numVal * hRatio) / wRatio;
            setHeight(newHeight.toFixed(0));
        } else {
            // Changed Height, Calculate Width
            const newWidth = (numVal * wRatio) / hRatio;
            setWidth(newWidth.toFixed(0));
        }
    };

    const handleRatioChange = (newRatio: string) => {
        setRatio(newRatio as ImageRatio);
        // Recalculate based on the last edited field
        const [wRatio, hRatio] = newRatio.split(':').map(Number);
        if (lastEdited === 'width') {
             const currentW = parseFloat(width);
             if (!isNaN(currentW)) {
                setHeight(((currentW * hRatio) / wRatio).toFixed(0));
             }
        } else {
            const currentH = parseFloat(height);
            if (!isNaN(currentH)) {
                setWidth(((currentH * wRatio) / hRatio).toFixed(0));
            }
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <p className="text-sm text-slate-400 mb-4">设定任意一边尺寸，自动匹配另一边。</p>
                <SelectGroup
                    label="选择比例"
                    value={ratio}
                    onChange={handleRatioChange}
                    options={Object.values(ImageRatio).map(r => ({ value: r, label: r }))}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputGroup
                    label="宽度 (Width)"
                    value={width}
                    onChange={(val) => {
                        setWidth(val);
                        setLastEdited('width');
                        calculate('width', val);
                    }}
                    placeholder="px"
                />
                <InputGroup
                    label="高度 (Height)"
                    value={height}
                    onChange={(val) => {
                        setHeight(val);
                        setLastEdited('height');
                        calculate('height', val);
                    }}
                    placeholder="px"
                />
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                <div 
                    className="border-2 border-blue-400 bg-blue-500/10 flex items-center justify-center text-blue-300 font-bold transition-all duration-300"
                    style={{
                        aspectRatio: ratio.replace(':', '/'),
                        width: '100%',
                        maxHeight: '200px',
                        maxWidth: '100%'
                    }}
                >
                    {ratio}
                </div>
            </div>
        </div>
    );
};
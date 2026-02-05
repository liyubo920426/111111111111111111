import React, { useState } from 'react';
import { ImageRatioTool } from './features/ImageRatioTool';
import { ScreenSizeTool } from './features/ScreenSizeTool';
import { CapacityTool } from './features/CapacityTool';

enum Tab {
    CAPACITY = 'capacity',
    IMAGE = 'image',
    SCREEN = 'screen'
}

// Icons
const IconImage = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
        <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
        <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const IconScreen = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2"/>
        <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const IconCapacity = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>(Tab.CAPACITY);

    const renderContent = () => {
        switch (activeTab) {
            case Tab.CAPACITY: return <CapacityTool />;
            case Tab.IMAGE: return <ImageRatioTool />;
            case Tab.SCREEN: return <ScreenSizeTool />;
        }
    };

    const getTitle = () => {
        switch (activeTab) {
            case Tab.CAPACITY: return "展厅承载量";
            case Tab.IMAGE: return "图片比例换算";
            case Tab.SCREEN: return "屏幕尺寸计算";
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-blue-500 selection:text-white pb-24">
            {/* Header - Sticky */}
            <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 pt-safe-top">
                <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        {getTitle()}
                    </h1>
                    <div className="text-xs font-mono text-slate-500">李钰博-v1.0</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-md mx-auto px-6 py-6">
                {renderContent()}
            </main>

            {/* Bottom Navigation - Fixed */}
            <nav className="fixed bottom-0 left-0 right-0 bg-slate-850 border-t border-slate-800 pb-safe-bottom z-50">
                <div className="max-w-md mx-auto flex justify-around items-center px-2 py-2">
                    <button 
                        onClick={() => setActiveTab(Tab.CAPACITY)}
                        className={`flex flex-col items-center p-3 rounded-2xl w-full transition-all duration-200 ${activeTab === Tab.CAPACITY ? 'text-blue-400 bg-slate-800' : 'text-slate-500 active:scale-95'}`}
                    >
                        <IconCapacity />
                        <span className="text-[10px] mt-1 font-medium">承载量</span>
                    </button>

                    <button 
                        onClick={() => setActiveTab(Tab.IMAGE)}
                        className={`flex flex-col items-center p-3 rounded-2xl w-full transition-all duration-200 ${activeTab === Tab.IMAGE ? 'text-blue-400 bg-slate-800' : 'text-slate-500 active:scale-95'}`}
                    >
                        <IconImage />
                        <span className="text-[10px] mt-1 font-medium">比例</span>
                    </button>

                    <button 
                        onClick={() => setActiveTab(Tab.SCREEN)}
                        className={`flex flex-col items-center p-3 rounded-2xl w-full transition-all duration-200 ${activeTab === Tab.SCREEN ? 'text-blue-400 bg-slate-800' : 'text-slate-500 active:scale-95'}`}
                    >
                        <IconScreen />
                        <span className="text-[10px] mt-1 font-medium">屏幕</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default App;
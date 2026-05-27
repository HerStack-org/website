import React from 'react';

export default function DatasetVisualCues({ currentSceneIdx }) {
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center min-h-[120px] transition-all duration-300 z-10">
      
      {/* Scene 1: The Everyday Mystery */}
      {currentSceneIdx === 0 && (
        <div className="flex gap-3  text-sm text-[var(--ink)]">
          <div className="bg-white p-2 rounded-lg shadow-md font-mono">📅 Mon: ☀️ 24°C</div>
          <div className="bg-white p-2 rounded-lg shadow-md font-mono">📝 Todo List</div>
          <div className="bg-white p-2 rounded-lg shadow-md font-mono">🏀 Team Roster</div>
        </div>
      )}

      {/* Scene 2: Naming the Thing */}
      {currentSceneIdx === 1 && (
        <div className="grid grid-cols-3 gap-1 bg-white/20 p-2 rounded-xl text-xs font-mono w-full max-w-xs border border-white/20 animate-pulse">
          <div className="bg-white/30 p-1 font-bold">Monday</div>
          <div className="bg-white/30 p-1 font-bold">Tuesday</div>
          <div className="bg-white/30 p-1 font-bold">Wednesday</div>
          <div className="bg-white/10 p-1">35.8° C</div>
          <div className="bg-white/10 p-1">36.2° C</div>
          <div className="bg-white/10 p-1">35.9° C</div>
        </div>
      )}

      {/* Scene 3: One Row, One Story */}
      {currentSceneIdx === 2 && (
        <div className="w-full max-w-xs bg-white/10 p-2 rounded-lg flex gap-1 border border-white/20">
          <div className="bg-amber-400 p-2 text-xs font-mono text-slate-900 rounded flex-1 transition delay-100 duration-500 animate-pulse">ID: 101</div>
          <div className="bg-amber-400 p-2 text-xs font-mono text-slate-900 rounded flex-1 transition delay-300 duration-500 animate-pulse">Name: Alice</div>
          <div className="bg-amber-400 p-2 text-xs font-mono text-slate-900 rounded flex-1 transition delay-500 duration-500 animate-pulse">Age: 24</div>
        </div>
      )}

      {/* Scene 4: Many Shapes of Data */}
      {currentSceneIdx === 3 && (
        <div className="flex gap-4 text-3xl bg-white/10 p-4 rounded-2xl border border-white/20">
          <div className="p-2 bg-white/10 rounded-xl hover:scale-110 transition">📊</div>
          <div className="p-2 bg-white/10 rounded-xl hover:scale-110 transition">🖼️</div>
          <div className="p-2 bg-white/10 rounded-xl hover:scale-110 transition">♫</div>
          <div className="p-2 bg-white/10 rounded-xl hover:scale-110 transition">📄</div>
        </div>
      )}

      {/* Scene 5: Where Data Comes From */}
      {currentSceneIdx === 4 && (
        <div className="relative w-full h-16 flex items-center justify-between text-2xl px-6">
          <span className="text-4xl">🛰️</span>
          <span className="text-4xl">📱</span>
          <span className="text-4xl ">📥</span>
          <span className="text-4xl">💻</span>
          <span className="text-4xl">⏱️</span>
        </div>
      )}

      {/* Scene 6: Clean vs Messy */}
      {currentSceneIdx === 5 && (
        <div className="flex items-center gap-2 w-full max-w-xs text-xs font-mono">
          <div className="bg-red-500/30 border border-red-500 p-2 rounded flex-1 line-through opacity-70">
            [NULL] undefined NY!!
          </div>
          <div className="text-xl">🧹</div>
          <div className="bg-emerald-500/40 border border-emerald-500 p-2 rounded flex-1 font-bold">
            "New York"
          </div>
        </div>
      )}

      {/* Scene 7: What You Can Do */}
      {currentSceneIdx === 6 && (
        <div className="flex flex-col items-center w-full">
          <div className="bg-white/20 px-3 py-1 rounded text-xs">Dataset</div>
          <div className="h-4 w-0.5 bg-white/40"></div>
          <div className="flex gap-4 text-xs">
            <div className="bg-purple-500/40 p-1.5 rounded border border-purple-400">📈 Charts</div>
            <div className="bg-teal-500/40 p-1.5 rounded border border-teal-400">🧮 Math</div>
            <div className="bg-amber-500/40 p-1.5 rounded border border-amber-400">🤖 Train AI</div>
          </div>
        </div>
      )}

      {/* Scene 8: A Dataset in the Wild */}
      {currentSceneIdx === 7 && (
        <div className="w-full max-w-xs bg-slate-900/60 p-3 rounded-xl border border-white/10 text-left text-[11px] font-mono">
          <div className="border-b border-white/10 pb-1 mb-1 text-white/50 flex justify-between">
            <span>sqft: 1200</span><span>beds: 2</span>
          </div>
          <div className="flex justify-between items-center text-amber-300 font-bold">
            <span>Price Estimate:</span>
            <span className="text-sm bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/40 animate-pulse">
              ❓ Calculating...
            </span>
          </div>
        </div>
      )}

      {/* Scene 9: Core Definition */}
      {currentSceneIdx === 8 && (
        <div className="text-5xl transform scale-110 ">
          🗂️
        </div>
      )}

    </div>
  );
}
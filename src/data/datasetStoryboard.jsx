// src/data/DatasetStoryboard.jsx

import { useState } from "react";
import { datasetScenes } from "./datasetStory";
import DatasetVisualCues from "./datasetVisualCues";

export default function DatasetStoryboard({ onClose }) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);

  return (
    <div className="w-full flex flex-col max-h-[90vh] border border-[rgba(13,13,13,0.08)] bg-white rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[rgba(13,13,13,0.05)] flex items-center justify-between bg-[var(--cream)]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🗂️</span>
          <h3 className="font-bold text-base text-[var(--ink)]">What is a Dataset?</h3>
        </div>
        <button onClick={onClose} className="text-xs font-semibold px-3 py-1.5 bg-white border border-[rgba(13,13,13,0.1)] rounded-xl hover:bg-gray-50 text-[var(--ink)]">
          ✕ Close
        </button>
      </div>

      {/* Visual Canvas Box */}
      <div className="p-8 flex flex-col items-center justify-center min-h-[220px] text-center text-white" style={{ background: 'linear-gradient(135deg, var(--ink-soft), var(--purple))' }}>
        <span className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full mb-3">
          Scene {datasetScenes[currentSceneIdx].scene} of {datasetScenes.length}
        </span>
        <h4 className="text-2xl font-bold mb-2 font-display">{datasetScenes[currentSceneIdx].title}</h4>
        <DatasetVisualCues currentSceneIdx={currentSceneIdx} />
      </div>

      {/* Narrative */}
      <div className="p-6 bg-white min-h-[100px] flex items-center justify-center">
        <p className="text-base leading-relaxed text-[var(--ink)] text-center font-medium">{datasetScenes[currentSceneIdx].narrative}</p>
      </div>

      {/* Navigation Footer */}
      <div className="px-6 py-4 bg-[var(--cream)] border-t border-[rgba(13,13,13,0.05)] flex items-center justify-between">
        <button disabled={currentSceneIdx === 0} onClick={() => setCurrentSceneIdx(prev => prev - 1)} className="px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[rgba(13,13,13,0.1)] text-[var(--ink)] disabled:opacity-40">
          ← Back
        </button>
        <div className="text-xs font-bold text-[var(--ink-muted)] uppercase">{Math.round(((currentSceneIdx + 1) / datasetScenes.length) * 100)}% Done</div>
        {currentSceneIdx < datasetScenes.length - 1 ? (
          <button onClick={() => setCurrentSceneIdx(prev => prev + 1)} className="px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--purple)] text-white">
            Next →
          </button>
        ) : (
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--teal)] text-white">
            Finish 🎉
          </button>
        )}
      </div>
    </div>
  );
}